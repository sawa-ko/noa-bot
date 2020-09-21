import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ErrorService } from '../../utils/services';

export abstract class BiteCommand {
  private _errorService: ErrorService = new ErrorService();

  @Command('admin')
  @Description('Te recomiendo no usar este comando.')
  async Bite(command: CommandMessage) {
    const userSelected = command.mentions.users.first() || command.author;
    const embedMessage = new MessageEmbed();
    const adminAnime =
      'https://media1.tenor.com/images/3a917052d57ef24dc742f2a86cdaa492/tenor.gif?itemid=10110761';
    const defaultNickNameUser = command.member.nickname;

    if (command.member.hasPermission('ADMINISTRATOR')) {
      return command.reply(
        'Tu no necesitas de mi para esto, tu eres el admin. <3',
      );
    }

    if (userSelected.username == command.author.username) {
      embedMessage.setTitle(
        `Preparen sus asientos, ahora ${command.author.username} es el Admin`,
      );
      embedMessage.setDescription(
        'Mis mas respeto oh señor todo poderoso, tenga piedad de este pequeño bot. ',
      );
      embedMessage.setFooter(`¡Larga vida a ${command.author.username}!`);
      embedMessage.setImage(adminAnime);

      if (!command.member.hasPermission('CHANGE_NICKNAME')) {
        return command.channel.send(
          this._errorService.showError(
            'Oh no, no he podido ejecutar este comando porque no tengo los permisos suficientes, necesito el siguiente permiso. \nPERMISO:\n **CHANGE_NICKNAME**',
          ),
        );
      }

      if (!command.member.hasPermission('MANAGE_NICKNAMES')) {
        return command.channel.send(
          this._errorService.showError(
            'Oh no, no he podido ejecutar este comando porque no tengo los permisos suficientes, necesito el siguiente permiso. \nPERMISO:\n **MANAGE_NICKNAMES**',
          ),
        );
      }

      command.member.setNickname(`[ADMIN] ${command.author.username}`);

      try {
        await command.reply(embedMessage);
      } catch (error) {
        command.channel.send(
          this._errorService.showError(
            'Oh no, no he podido ejecutar este comando, por favor intentalo de nuevo.',
          ),
        );
      }

      setTimeout(async () => {
        try {
          command.member.setNickname(defaultNickNameUser);
          await command.reply(
            'Ha verdad, que tu no eres el admin aqui jeje. ( ͡° ͜ʖ ͡°)',
          );
        } catch (error) {
          command.channel.send(
            this._errorService.showError(
              'Oh no, no he podido ejecutar este comando, por favor intentalo de nuevo.',
            ),
          );
        }
      }, 10000);
    } else {
      embedMessage.setTitle(
        `Sugoiiii, ${command.author.username} se ha autoplocamado el nuevo Admin`,
      );
      embedMessage.setDescription(
        `${command.author.username} tiene hasta mas poder que yo, ahora tengo miedo... ヽ(ﾟДﾟ)ﾉ`,
      );
      embedMessage.setFooter(`¡Larga vida a ${command.author.username}!`);
      embedMessage.setImage(adminAnime);
      command.member.setNickname(`[ADMIN] ${command.author.username}`);

      try {
        await command.reply(embedMessage);
      } catch (error) {
        command.channel.send(
          this._errorService.showError(
            'Oh no, no he podido ejecutar este comando, por favor intentalo de nuevo.',
          ),
        );
      }

      setTimeout(async () => {
        try {
          command.member.setNickname(defaultNickNameUser);
          await command.reply(
            'Ha verdad, que tu no eres el admin aqui jeje. ( ͡° ͜ʖ ͡°)',
          );
        } catch (error) {
          command.channel.send(
            this._errorService.showError(
              'Oh no, no he podido ejecutar este comando, por favor intentalo de nuevo.',
            ),
          );
        }
      }, 10000);
    }
  }
}
