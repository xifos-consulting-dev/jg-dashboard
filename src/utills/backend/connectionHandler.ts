type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type QueryValue = string | number | boolean | null | undefined;

type QueryParams = Record<string, QueryValue>;

interface ClientConfig {
  baseUrl: string;
  timeoutMs: number;
  defaultHeaders: HeadersInit;
}

interface RequestOptions extends Omit<RequestInit, 'method' | 'body' | 'signal'> {
  /**
   * Optional query parameters appended to the request URL.
   */
  query?: QueryParams;
  /**
   * The request body. Plain objects are automatically JSON serialised.
   */
  body?: BodyInit | Record<string, unknown>;
  /**
   * Override the default timeout for this request.
   */
  timeoutMs?: number;
  /**
   * When true, skip body parsing and return the native Response object.
   */
  rawResponse?: boolean;
}

interface BackendRequestErrorContext {
  status?: number;
  data?: unknown;
  method: HttpMethod;
  url: string;
  cause?: unknown;
}

const ENV_BASE_URL =
  (import.meta.env.VITE_BACKEND_URL as string | undefined)?.trim() || 'http://localhost:3000/api';
const ENV_TIMEOUT = (import.meta.env.VITE_BACKEND_TIMEOUT_MS as string | undefined)?.trim();

const DEFAULT_TIMEOUT_MS = (() => {
  const parsed = Number(ENV_TIMEOUT);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10_000;
})();

const DEFAULT_HEADERS: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && value.constructor === Object;

const sanitiseBaseUrl = (value: string): string => value.replace(/\/+$/, '');

export class BackendRequestError extends Error {
  readonly status?: number;
  readonly data?: unknown;
  readonly method: HttpMethod;
  readonly url: string;

  constructor(message: string, context: BackendRequestErrorContext) {
    super(message);
    this.name = 'BackendRequestError';
    this.status = context.status;
    this.data = context.data;
    this.method = context.method;
    this.url = context.url;
    if (context.cause !== undefined) {
      (this as Error & { cause?: unknown }).cause = context.cause;
    }
  }

  get isClientError(): boolean {
    return typeof this.status === 'number' && this.status >= 400 && this.status < 500;
  }

  get isServerError(): boolean {
    return typeof this.status === 'number' && this.status >= 500;
  }
}

export class BackendClient {
  private static instance: BackendClient | null = null;

  static getInstance(
    config?: Partial<Omit<ClientConfig, 'defaultHeaders'>> & { defaultHeaders?: HeadersInit }
  ): BackendClient {
    if (!BackendClient.instance) {
      const baseUrl = config?.baseUrl ?? ENV_BASE_URL;

      if (!baseUrl) {
        throw new Error(
          'Backend base URL is not defined. Provide VITE_BACKEND_BASE_URL in your environment or pass baseUrl to getInstance().'
        );
      }

      BackendClient.instance = new BackendClient({
        baseUrl,
        timeoutMs: config?.timeoutMs ?? DEFAULT_TIMEOUT_MS,
        defaultHeaders: config?.defaultHeaders ?? DEFAULT_HEADERS,
      });
    }

    return BackendClient.instance;
  }

  static reset(): void {
    BackendClient.instance = null;
  }

  private readonly config: ClientConfig;

  private constructor(config: Omit<ClientConfig, 'baseUrl'> & { baseUrl: string }) {
    const trimmedBaseUrl = sanitiseBaseUrl(config.baseUrl);

    if (!/^https?:\/\//i.test(trimmedBaseUrl)) {
      throw new Error(
        `Invalid backend base URL "${config.baseUrl}". Please include the protocol, e.g. https://api.example.com`
      );
    }

    this.config = {
      baseUrl: trimmedBaseUrl,
      timeoutMs: config.timeoutMs,
      defaultHeaders: config.defaultHeaders,
    };
  }

  get baseUrl(): string {
    return this.config.baseUrl;
  }

  get timeoutMs(): number {
    return this.config.timeoutMs;
  }

  async get<TResponse = unknown>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>('GET', path, options);
  }

  async post<TResponse = unknown>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>('POST', path, options);
  }

  async put<TResponse = unknown>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>('PUT', path, options);
  }

  async patch<TResponse = unknown>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>('PATCH', path, options);
  }

  async delete<TResponse = unknown>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.request<TResponse>('DELETE', path, options);
  }

  private async request<TResponse>(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    const { query, body, timeoutMs, rawResponse, headers, ...init } = options;
    const url = this.buildUrl(path, query);
    const mergedHeaders = this.mergeHeaders(headers);
    const preparedBody = this.prepareBody(body, mergedHeaders);
    const controller = new AbortController();
    const signal = controller.signal;

    const timeout =
      typeof timeoutMs === 'number' && timeoutMs > 0 ? timeoutMs : this.config.timeoutMs;
    const timeoutId = timeout > 0 ? setTimeout(() => controller.abort(), timeout) : undefined;

    try {
      const response = await fetch(url, {
        ...init,
        method,
        headers: mergedHeaders,
        body: preparedBody,
        signal,
      });

      if (rawResponse) {
        if (!response.ok) {
          await this.handleErrorResponse(method, url, response);
        }

        return response as unknown as TResponse;
      }

      const payload = await this.readBody(response);

      if (!response.ok) {
        this.throwError(method, url, response.status, response.statusText, payload);
      }

      return payload as TResponse;
    } catch (error) {
      if (error instanceof BackendRequestError) {
        throw error;
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new BackendRequestError(`Request timed out after ${timeout}ms`, {
          method,
          url,
          cause: error,
        });
      }

      throw new BackendRequestError('Network request failed', {
        method,
        url,
        cause: error,
      });
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  private buildUrl(path: string, query?: QueryParams): string {
    const target = this.isAbsoluteUrl(path)
      ? sanitiseBaseUrl(path)
      : `${this.config.baseUrl}/${path.replace(/^\/+/, '')}`;

    const url = new URL(target);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          return;
        }

        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private mergeHeaders(headers?: HeadersInit): Headers {
    const merged = new Headers();

    this.appendHeaders(merged, this.config.defaultHeaders);
    if (headers) {
      this.appendHeaders(merged, headers);
    }

    return merged;
  }

  private appendHeaders(target: Headers, source: HeadersInit): void {
    if (source instanceof Headers) {
      source.forEach((value, key) => target.set(key, value));
      return;
    }

    if (Array.isArray(source)) {
      source.forEach(([key, value]) => target.set(key, value));
      return;
    }

    Object.entries(source).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }
      target.set(key, value);
    });
  }

  private prepareBody(body: RequestOptions['body'], headers: Headers): BodyInit | undefined {
    if (body === undefined || body === null) {
      return undefined;
    }

    if (body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob) {
      headers.delete('Content-Type');
      return body;
    }

    if (isPlainObject(body)) {
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      return JSON.stringify(body);
    }

    return body as BodyInit;
  }

  private async readBody(response: Response): Promise<unknown> {
    if (response.status === 204 || response.status === 205) {
      return undefined;
    }

    const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

    if (contentType.includes('application/json')) {
      try {
        return await response.clone().json();
      } catch {
        return await response.text();
      }
    }

    if (contentType.startsWith('text/')) {
      return await response.text();
    }

    return await response.arrayBuffer();
  }

  private async handleErrorResponse(
    method: HttpMethod,
    url: string,
    response: Response
  ): Promise<never> {
    const payload = await this.readBody(response);
    this.throwError(method, url, response.status, response.statusText, payload);
  }

  private throwError(
    method: HttpMethod,
    url: string,
    status: number,
    statusText: string,
    payload: unknown
  ): never {
    const message = this.resolveErrorMessage(status, statusText, payload);
    throw new BackendRequestError(message, {
      method,
      url,
      status,
      data: payload,
    });
  }

  private resolveErrorMessage(status: number, statusText: string, payload: unknown): string {
    if (
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string'
    ) {
      return payload.message;
    }

    if (typeof payload === 'string' && payload.trim().length > 0) {
      return payload;
    }

    return `${status} ${statusText}`.trim();
  }

  private isAbsoluteUrl(value: string): boolean {
    return /^https?:\/\//i.test(value);
  }
}

let sharedClient: BackendClient | null = null;

/**
 * Returns the shared backend client instance.
 * Call with a config object during app bootstrap if you need to override defaults.
 */
export const getBackendClient = (
  config?: Parameters<typeof BackendClient.getInstance>[0]
): BackendClient => {
  if (!sharedClient) {
    sharedClient = BackendClient.getInstance(config);
  }

  return sharedClient;
};

/**
 * Helper for testing or edge cases where the client should be recreated.
 */
export const resetBackendClient = (): void => {
  sharedClient = null;
  BackendClient.reset();
};
