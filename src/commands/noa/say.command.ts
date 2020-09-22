import { Command, CommandMessage, Description } from '@typeit/discord';

import { ErrorService } from '../../utils/services';

export abstract class MamiChanCommand {
  private _errorService: ErrorService = new ErrorService();

  @Command('say')
  @Description('Hace que Noa diga algo que quieras.')
  async Say(command: CommandMessage) {
    const args = command.content
      .slice('noa'.length + 'say'.length + 1)
      .trim()
      .toString();

    try {
      await command.delete();
      await command.channel.send(args);
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido hacer lo que querias Onii-Chan, por favor vuelve a intentarlo. (⌣_⌣”)',
        ),
      );
    }
  }
}
