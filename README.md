# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Backend client

Set the following environment variables in your Vite `.env` file so the shared backend client can connect via native `fetch`:

- `VITE_BACKEND_BASE_URL` - fully qualified base URL for the API (e.g. `https://api.example.com`)
- `VITE_BACKEND_TIMEOUT_MS` - optional per-request timeout override in milliseconds (defaults to `10000`)

Import the singleton helper with `getBackendClient()` and use the convenience methods (`get`, `post`, etc.). Errors throw a `BackendRequestError` that includes the HTTP status, URL, and any response payload for debugging.

```ts
// src/services/userService.ts
import { BackendRequestError, getBackendClient } from '@/utills/backend/connectionHandler';

const client = getBackendClient();

export async function fetchCurrentUser() {
  try {
    return await client.get<{ id: string; name: string }>('users/me');
  } catch (error) {
    if (error instanceof BackendRequestError && error.isClientError) {
      // Handle expected 4xx response, e.g. unauthenticated
      return null;
    }

    throw error;
  }
}

export async function login(credentials: { email: string; password: string }) {
  const response = await client.post<{ token: string }>('auth/login', {
    body: credentials,
  });

  return response.token;
}
```
