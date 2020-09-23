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

  @Command('m bulk :type :total')
  @Infos({ forAdmins: true })
  @Description('Comando para banear usuarios.')
  async Ban(command: CommandMessage) {
    const { total, type } = command.args;
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

    if (isNaN(total) && type == '-s') {
      return await command.channel.send(
        this._errorService.showError(
          'Como elegiste el tipo de **-s** por favor necesito saber cuantos mensajes tengo que borrar en numeros.',
        ),
      );
    }

    try {
      switch (type) {
        case '-a':
          const messagesChannel = (
            await command.channel.messages.fetch({ limit: 100 })
          ).size;

          embedMessage.setTitle('Mensajes eliminados');
          embedMessage.setDescription(
            'Muy bien, he eliminado un total de 100 mensajes.',
          );
          embedMessage.setFooter('Buena limpieza has hecho Onni-Chan');

          await command.delete();
          await command.channel.messages.channel.bulkDelete(messagesChannel);
          await command.channel.send(embedMessage);
          break;
        case '-s':
          embedMessage.setTitle('Mensajes selecionados eliminados');
          embedMessage.setDescription(
            `Muy bien, he eliminado un total de ${total} mensajes.`,
          );
          embedMessage.setFooter('Buena limpieza has hecho Onni-Chan');

          await command.delete();
          await command.channel.messages.channel.bulkDelete(total);
          await command.channel.send(embedMessage);
          break;
        default:
          break;
      }
    } catch (error) {
      await command.channel.send(
        this._errorService.showError(
          'Oh no, no he podido eliminar los mensajes que querias porque tuve un problema, por favor intentalo de nuevo. UnU',
        ),
      );
    }
  }
}
