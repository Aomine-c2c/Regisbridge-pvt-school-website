// Lightweight logger to keep production consoles clean.
// - In production (NODE_ENV === 'production'), only warn and error are emitted.
// - In development, all levels emit to console.

const isProd = process.env.NODE_ENV === 'production';

type LogArgs = any[];

function make(level: 'debug' | 'info' | 'log' | 'warn' | 'error', emitInProd: boolean) {
  return (...args: LogArgs) => {
    if (isProd && !emitInProd) return;
    // Call the native console method with a small prefix for clarity
    switch (level) {
      case 'debug':
        // Some environments may not show debug; still call it for dev
        console.debug('[debug]', ...args);
        break;
      case 'info':
        console.info('[info]', ...args);
        break;
      case 'warn':
        console.warn('[warn]', ...args);
        break;
      case 'error':
        console.error('[error]', ...args);
        break;
      case 'log':
      default:
        console.log('[log]', ...args);
    }
  };
}

export const logger = {
  debug: make('debug', false),
  info: make('info', false),
  log: make('log', false),
  warn: make('warn', true),
  error: make('error', true),
};

export default logger;
