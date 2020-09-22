import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class HelpNoa {
  private _errorService: ErrorService = new ErrorService();

  @Command('h noa')
  @Description('Muestra la lista de comandos que noa puede hacer por ti.')
  async HelpNoa(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp += 'Bien, esto puedo hacer por ti.\n';
    descriptionHelp += '\n';
    descriptionHelp += '🤜 **noa say [mensaje - obligatorio]**\n';
    descriptionHelp += '=> Dire algo que quieras por ti.\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(ConfigurationBotEnum.PHOTO_BOT);
    embedMessage.setTitle('Comandos de Noa');
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
