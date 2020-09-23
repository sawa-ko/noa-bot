import { Command, CommandMessage, Description } from '@typeit/discord';

import { ErrorService } from '../../utils/services';

export abstract class SayCommand {
  private _errorService: ErrorService = new ErrorService();

  @Command('say :content')
  @Description('Hace que Noa diga algo que quieras.')
  async Say(command: CommandMessage) {
    const { content } = command.args;

    try {
      await command.delete();
      await command.channel.send(content);
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido hacer lo que querias Onii-Chan, por favor vuelve a intentarlo. (⌣_⌣”)',
        ),
      );
    }
  }
}
