import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class HelpSocial {
  private _errorService: ErrorService = new ErrorService();

  @Command('h social')
  @Description('Coamandos de bromas para los usuarios.')
  async HelpSocial(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp +=
      'Si quieres ser mi fiel seguidor, ¡Te invito a que me sigas en mis redes sociales!\n';
    descriptionHelp += '\n';
    descriptionHelp += '🔵 **Facebook**\n';
    descriptionHelp += 'https://www.facebook.com/noachanvt\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(ConfigurationBotEnum.PHOTO_BOT);
    embedMessage.setTitle('Mis redes sociales');
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
