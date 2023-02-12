import { expressApp } from '@app';

const PORT = process.env.PORT ?? 3000;

expressApp().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running at port ${PORT}`);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => process.exit());
