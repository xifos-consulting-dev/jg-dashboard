import { useCallback } from 'react';

/**
 * A simple React hook to set and get cookies in the browser.
 *
 * Usage:
 * const { setCookie, getCookie } = useCookies();
 *
 * setCookie('authToken', 'my-secret-token', 7); // Persistent cookie for 7 days
 * setCookie('sessionId', 'abc123');            // Session cookie (expires on tab close)
 * const token = getCookie('authToken');
 */
export const useCookies = () => {
  /**
   * Set a cookie in the browser.
   *
   * @param name - The name/key of the cookie.
   * @param value - The value to store in the cookie.
   * @param days - Optional number of days until the cookie expires.
   *               If omitted, the cookie becomes a session cookie.
   */
  const setCookie = useCallback((name: string, value: string, days?: number) => {
    let expires = '';
    if (days !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
  }, []);

  /**
   * Get a cookie value by name.
   *
   * @param name - The name/key of the cookie.
   * @returns The decoded value of the cookie, or null if not found.
   */
  const getCookie = useCallback((name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }, []);

  return { setCookie, getCookie };
};
