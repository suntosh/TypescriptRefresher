// src/utils/logger.ts

export default class Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}
