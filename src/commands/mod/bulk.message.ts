import {
  Client,
  Command,
  CommandMessage,
  Description,
  Infos,
} from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { EmbedColorsArray, RolesModEnum } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class BanCommand {
  private _errorService: ErrorService = new ErrorService();

  @Command('m bulk :total')
  @Infos({ forAdmins: true })
  @Description('Comando para banear usuarios.')
  async Ban(command: CommandMessage) {
    const { total } = command.args;
    const embedMessage = new MessageEmbed();
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    if (
      !command.member.roles.cache.has(RolesModEnum.ADMINISTRATOR) ||
      !command.member.roles.cache.has(RolesModEnum.MODERATOR)
    ) {
      return await command.channel.send(
        this._errorService.showError(
          'Lo siento pero este comando esta disponible solo para los administrados o moderadores del servidor.',
        ),
      );
    }

    if (isNaN(total)) {
      return await command.channel.send(
        this._errorService.showError(
          'Por favor necesito saber cuantos mensajes tengo que borrar en numeros.',
        ),
      );
    }

    if (total > 100) {
      return await command.channel.send(
        this._errorService.showError(
          'No puedo borrar mas de 100 mensajes, perdoname por favor. (∩︵∩)',
        ),
      );
    }

    try {
      embedMessage.setTitle('Mensajes selecionados eliminados');
      embedMessage.setDescription(
        `Muy bien, he eliminado un total de ${total} mensajes.`,
      );
      embedMessage.setFooter('Buena limpieza has hecho Onni-Chan');

      await command.delete();
      await command.channel.messages.channel.bulkDelete(total);
      await command.channel.send(embedMessage);
    } catch (error) {
      await command.channel.send(
        this._errorService.showError(
          'Oh no, no he podido eliminar los mensajes que querias porque tuve un problema, seguramente fue porque querias eliminar mas de 100, no puedo con mas de esos, son demasiados. UnU',
        ),
      );
    }
  }
}
