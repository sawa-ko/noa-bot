import { Command, CommandMessage, Description, Infos } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import {
  ConfigurationBotEnum,
  EmbedColorsArray,
  RolesModEnum,
} from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class KickCommand {
  private _errorService: ErrorService = new ErrorService();

  @Command('m kick')
  @Infos({ forAdmins: true })
  @Description('Comando para expulsar usuarios.')
  async Kick(command: CommandMessage) {
    const userSelected = command.mentions.users.first();
    const reason = command.content.split(' ').splice(4).join(' ');

    const embedMessage = new MessageEmbed();
    embedMessage.setTitle(
      `El usuario ${userSelected.username} ha sido expulsado por ${command.author.username}`,
    );
    embedMessage.setDescription(`Razon: ${reason}`);
    embedMessage.setFooter(
      'Comando solo disponible para moderadores / administradores.',
    );
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

    if (!userSelected) {
      return await command.channel.send(
        this._errorService.showError(
          'Querido administrador / moderador, si vas a usar este comando que sea para expulsar a un mal usuario, no para hacer nada. ( ͡° ͜ʖ ͡°)',
        ),
      );
    }

    if (!reason) {
      return await command.channel.send(
        this._errorService.showError(
          'Necesito saber la razon de la expulsion, po-por favor administrador...',
        ),
      );
    }

    if (!command.member.hasPermission('KICK_MEMBERS')) {
      return await command.channel.send(
        this._errorService.showError(
          'Lo siento, pero me hace falta el siguiente permiso. \n**Permisos:** \n- KICK_MEMBERS',
        ),
      );
    }

    if (userSelected.username == command.author.username) {
      return await command.channel.send(
        this._errorService.showError(
          'No-no puedes expulsarte a ti mismo, si lo haces, ¿Quien me va a cuidar? (︶︹︺)',
        ),
      );
    }

    if (userSelected.username == ConfigurationBotEnum.NAME_BOT) {
      return await command.channel.send(
        this._errorService.showError(
          '¿De verdad quieres eso? ¿Ya no me quieres? </3, pensé que nos queríamos, pero supongo que solo yo tenía ese sueño...',
        ),
      );
    }

    try {
      const user = command.guild.member(userSelected);
      await user.kick(reason);
      await command.delete();
      await command.channel.send(embedMessage);
    } catch (error) {
      return await command.channel.send(
        this._errorService.showError(
          'Me ha ganado esta batalla de poder y no he podido expulsar a este usuario, perdoname... (▰︶︹︺▰)',
        ),
      );
    }
  }
}
