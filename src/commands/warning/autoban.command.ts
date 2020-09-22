import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { TenorService, ErrorService } from '../../utils/services';

export abstract class BiteCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('autoban')
  @Description('Te recomiendo no usar este comando.')
  async AutoBan(command: CommandMessage) {
    const userSelected = command.mentions.users.first() || command.author;
    const embedMessage = new MessageEmbed();
    const bakaAnime = (await this._tenorService.getRandom('Anime Sad')).body
      .results[0].media[0].gif.url;

    if (userSelected.username == command.author.username) {
      embedMessage.setTitle(
        'Muy bien, comenzando proceso para banear al usuario',
      );
      embedMessage.setDescription('Seras baneado en 10 segundos....');
      embedMessage.setFooter(
        'Te adverti no usar este comando, pero no me hiciste caso. Hasta luego.',
      );
      embedMessage.setImage(bakaAnime);

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
        `Oh nooooo, ${command.author.username} ha baneado a ${userSelected.username}`,
      );
      embedMessage.setDescription(
        `¿Porque lo has hecho? ${userSelected.username} era muy buena persona, ahora ${userSelected.username} sera baneado en 10 segundos eres malo. (▰˘︹˘▰)`,
      );
      embedMessage.setFooter(
        'Ire a consolar al usuario baneado, un momento. (∩︵∩)',
      );
      embedMessage.setImage(bakaAnime);

      try {
        await command.channel.send(embedMessage);
      } catch (error) {
        command.channel.send(
          this._errorService.showError(
            'Oh no, no he podido ejecutar este comando, por favor intentalo de nuevo.',
          ),
        );
      }

      setTimeout(async () => {
        try {
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
