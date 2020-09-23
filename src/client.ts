import {
  CommandNotFound,
  Discord,
  CommandMessage,
  On,
  ArgsOf,
  Client,
  Rule,
} from '@typeit/discord';
import { MessageEmbed } from 'discord.js';
import { join } from 'path';

import { DatabaseService } from './utils/database';
import { EmbedColorsEnum } from './utils/enums';
import { ErrorService } from './utils/services';

@Discord(Rule().startWith('noab').spaceOrEnd(), {
  import: [
    join(__dirname, 'commands/**', '*.ts'),
    join(__dirname, 'commands/**', '*.js'),
  ],
})
export class DiscordApp {
  private _errorService: ErrorService = new ErrorService();
  private _databaseService: DatabaseService = new DatabaseService();

  @On('message')
  onMessage([message]: ArgsOf<'message'>, client: Client) {
    // console.log(message);
  }

  @On('ready')
  async onReady(_, bot) {
    this._databaseService.init();

    bot.user.setActivity(
      'noa help | Con este comando puedes ver lo que puedo hacer (￣▽￣)ノ',
    );
  }

  @CommandNotFound()
  async notFoundA(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    embedMessage.setTitle('Este comando no es mio Onni-Chan');
    embedMessage.setDescription(
      'Te recomiendo usar el comando **noa help** para ver lo que puedo usar.',
    );
    embedMessage.setFooter(
      'Si aun tienes problemas, contacta a mi creador @kaname#0001',
    );
    embedMessage.setColor(EmbedColorsEnum.RED);

    try {
      await command.channel.send(embedMessage);
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido hacer lo que querias Onii-Chan, por favor vuelve a intentarlo. (⌣_⌣”)',
        ),
      );
    }
  }
}
