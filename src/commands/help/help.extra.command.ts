import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class HelpExtra {
  private _errorService: ErrorService = new ErrorService();

  @Command('h extra')
  @Description('Comandos extras personalizados que puedo hacer.')
  async HelpExtra(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp +=
      'Cuidado, estos comandos no son oficiales, son por peticiones. OwO\n';
    descriptionHelp += '\n';
    descriptionHelp += '🤜 **noa mamichan**\n';
    descriptionHelp += '=> Observar a la grandiosa Mami Chan.\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(ConfigurationBotEnum.PHOTO_BOT);
    embedMessage.setTitle('Comandos Extras');
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
