import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { TenorService, ErrorService } from '../../utils/services';

export abstract class HappyCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('happy')
  @Description('Ponte feliz como una lombris.')
  async Happy(command: CommandMessage) {
    const userSelected = command.mentions.users.first();
    const embedMessage = new MessageEmbed();
    const happyAnime = (await this._tenorService.getRandom('Anime Happy', 1))
      .body.results[0].media[0].gif.url;
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    if (userSelected) {
      switch (userSelected.username) {
        case ConfigurationBotEnum.NAME_BOT:
          embedMessage.setTitle(
            `¡Yeii, ${command.author.username} esta feliz conmigo!`,
          );
          embedMessage.setDescription(`¡Vamos a ser felices como una lombris!`);
          embedMessage.setImage(happyAnime);
          embedMessage.setFooter('¡Todos deberiamos de estar felices!');

          try {
            await command.channel.send(embedMessage);
          } catch (error) {
            command.channel.send(
              this._errorService.showError(
                'Oh no, no he podido ponerme feliz contigo. :(',
              ),
            );
          }
          break;
        default:
          embedMessage.setTitle(
            `¡Super, en este dia ${command.author.username} y ${userSelected.username} estan felices!`,
          );
          embedMessage.setDescription(
            'Repite conmigo ¡FELIZ COMO UNA LOMBRIS!',
          );
          embedMessage.setImage(happyAnime);
          embedMessage.setFooter('¡Todos deberiamos de estar felices!');

          try {
            await command.channel.send(embedMessage);
          } catch (error) {
            command.channel.send(
              this._errorService.showError(
                'Algo paso y no se pudieron poner felices los dos. </3',
              ),
            );
          }
          break;
      }
    } else {
      embedMessage.setTitle(`¡${command.author.username} se siente feliz! OwO`);
      embedMessage.setDescription(
        'Espero este asi pequeño Onni-Chan, de parte de tu Loli favorita. ❤',
      );
      embedMessage.setImage(happyAnime);
      embedMessage.setFooter('¡Feliz como una lombris!');

      try {
        await command.channel.send(embedMessage);
      } catch (error) {
        command.channel.send(
          this._errorService.showError('No puede ser, ¿Por que no esta feliz?'),
        );
      }
    }
  }
}
