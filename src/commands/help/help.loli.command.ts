import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class HelpLoli {
  private _errorService: ErrorService = new ErrorService();

  @Command('h loli')
  @Description('Muestra la lista de comandos de como obtener Lolis gratis.')
  async HelpLoli(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp += 'Solo dire una cosa... ¡Lolis gratis para todos!\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa loli**\n';
    descriptionHelp += '=> Recibe una Loli que te quiere mucho. <3\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(ConfigurationBotEnum.PHOTO_BOT);
    embedMessage.setTitle('Comandos de Loli');
    embedMessage.setDescription(descriptionHelp);
    embedMessage.setFooter(
      'Si aun tienes problemas, contacta a mi creador @kaname#0001',
    );
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    try {
      await command.channel.send(embedMessage);
      await command.channel;
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido hacer lo que querias Onii-Chan, por favor vuelve a intentarlo. (⌣_⌣”)',
        ),
      );
    }
  }
}
