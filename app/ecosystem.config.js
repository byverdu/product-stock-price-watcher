module.exports = {
  apps: [
    {
      name: 'stock-alert-api',
      script: 'dist/server.js',
      instances: 'max',
      autorestart: true,
      watch: 'dist/**/*.js',
      max_memory_restart: '1G',
    },
    {
      name: 'app-watcher',
      script: 'pnpm dev',
      instances: 1,
      autorestart: true,
      watch: 'src/*',
    },
  ],
};
