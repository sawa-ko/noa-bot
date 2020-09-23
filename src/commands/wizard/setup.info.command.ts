import { Command, CommandMessage, Description } from '@typeit/discord';

import { DatabaseService } from '../../utils/database';
import { ErrorService } from '../../utils/services';

export abstract class SayCommand {
  private _errorService: ErrorService = new ErrorService();
  private _databaseService: DatabaseService = new DatabaseService();

  @Command('setup info')
  @Description('Obtiene la configuracion actual del bot en el servidor.')
  async Say(command: CommandMessage) {}
}
