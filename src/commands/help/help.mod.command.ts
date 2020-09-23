import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class HelpMod {
  private _errorService: ErrorService = new ErrorService();

  @Command('h mod')
  @Description(
    'Muestra los comandos permitidos solo para Mods y Administradores.',
  )
  async HelpMod(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp +=
      'Llego la hora de poner orden aqui, ten estos comandos.\n';
    descriptionHelp += '\n';

    descriptionHelp +=
      '🤜 **noa m ban [usuario - obligatorio] [dias - obligatorio] [razon - opcional]**\n';
    descriptionHelp += '=> Banea a un usuario por los dias que especifiques.\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa m kick [usuario - obligatorio]**\n';
    descriptionHelp += '=> Expulsa a un miembro del servidor.\n';
    descriptionHelp += '\n';

    descriptionHelp +=
      '🤜 **noa m bulk [numero de mensajes - obligatorio - max 100]**\n';
    descriptionHelp +=
      '=> Eliminar la cantidad de mensajes que especifiques. Tomando en cuenta que no se pueden borrar mas de 100 mensajes a la vez.\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(ConfigurationBotEnum.PHOTO_BOT);
    embedMessage.setTitle('Comandos de moderación');
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
