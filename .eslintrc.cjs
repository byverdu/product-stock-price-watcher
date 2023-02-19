module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.cjs', 'dist/*.js'],
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@types-product-stock-price-watcher'],
      },
    ],
    '@typescript-eslint/no-misused-promises': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
