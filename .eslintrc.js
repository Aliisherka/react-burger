module.exports = {
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        css: 'always',
      },
    ],
    'import/no-unresolved': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
    'max-len': ['error', { code: 130 }],
    'no-unused-expressions': 'off',
  },
  globals: {
    describe: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    alert: 'readonly',
    HTMLElement: 'readonly',
    document: 'readonly',
    window: 'readonly',
    localStorage: 'readonly',
    HTMLDivElement: 'readonly',
    KeyboardEvent: 'readonly',
    HTMLInputElement: 'readonly',
    HTMLFormElement: 'readonly',
    WebSocket: 'readonly',
    RequestInit: 'readonly',
  },
};
