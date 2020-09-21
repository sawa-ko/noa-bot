import { Logger } from 'tslog';

export class LoggerService {
  public logInfo(prefix: string, message: string) {
    const log: Logger = new Logger({ name: prefix });
    log.info(`=> ${message}`);
  }
}
