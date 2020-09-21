import { Client } from '@typeit/discord';
import { Logger } from 'tslog';

// DotEnv Configuration
import './utils/env/configuration';

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    const log: Logger = new Logger({
      name: '[MAIN]',
      displayFilePath: 'hidden',
      displayFunctionName: false,
      dateTimePattern: 'year-month-day hour:minute',
      overwriteConsole: true,
    });

    this._client = new Client();
    this._client.login(
      process.env.TOKEN_BOT,
      `${__dirname}/discords/*.ts`,
      `${__dirname}/discords/*.js`,
    );
    log.info('===========================================');
    log.info('= HOLA, SOY NOABOT Y AHORA ESTOY EN LINEA =');
    log.info('===========================================');
    log.info('');
    log.info('===========================================');
    log.info('=          ESTOS SON MIS COMANDOS         =');
    log.info('===========================================');
    if (Client.getCommands().length >= 1) {
      log.debug(Client.getCommands());
    } else {
      log.debug('=      Rayos, aun no tengo comandos       =');
      log.info('===========================================');
    }
  }
}

Main.start();
