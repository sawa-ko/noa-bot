import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class HelpWarning {
  private _errorService: ErrorService = new ErrorService();

  @Command('h warning')
  @Description('Coamandos de bromas para los usuarios.')
  async HelpWarning(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp += '¡ALERTA! ¡Comandos peligrosos!\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa autoban**\n';
    descriptionHelp += '=> Adios amiguito.\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa autoban [usuario - opcional]**\n';
    descriptionHelp += '=> Dile adios a tu amiguito.\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa hentai**\n';
    descriptionHelp += '=> Onni-Chan no seas puerco, por favor.\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(ConfigurationBotEnum.PHOTO_BOT);
    embedMessage.setTitle('Comandos peligrosos');
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
