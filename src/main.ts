import { Client } from '@typeit/discord';
import { Logger } from 'tslog';
import * as clearConsole from 'clear-any-console';

// DotEnv Configuration
import './utils/env/configuration';

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static async start() {
    const log: Logger = new Logger({
      name: '[MAIN]',
      displayFilePath: 'hidden',
      displayFunctionName: true,
      dateTimePattern: 'year-month-day hour:minute',
      overwriteConsole: true,
    });

    try {
      this._client = new Client();
      let token =
        process.env.DEV_MODE == 'yes'
          ? process.env.TOKEN_BOT_BETA
          : process.env.TOKEN_BOT;
      await this._client.login(
        token,
        `${__dirname}/client.ts`,
        `${__dirname}/client.js`,
      );
      await clearConsole();
      log.debug('===========================================');
      log.debug('=            LIMPIANDO CONSOLA            =');
      log.debug('===========================================');
      log.info('');
      log.info('===========================================');
      log.info('= HOLA, SOY NOABOT Y AHORA ESTOY EN LINEA =');
      log.info('===========================================');
      log.info('');
      log.info('===========================================');
      log.info('=          ESTOS SON MIS COMANDOS         =');
      log.info('===========================================');
      if (Client.getCommands().length >= 1) {
        log.info('===========================================');
        log.info(
          `=             TENGO EN TOTAL ${
            Client.getCommands().length
          }            =`,
        );
        log.info('===========================================');
        log.debug(Client.getCommands());
      } else {
        log.debug('=      Rayos, aun no tengo comandos       =');
        log.info('===========================================');
      }
    } catch ({ message }) {
      log.debug('===========================================');
      log.debug('=     LO SIENTO, NO HE PODIDO REVIVIR     =');
      log.debug('===========================================');
      log.info('');
      log.error(message);
    }
  }
}

Main.start();
