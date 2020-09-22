import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { TenorService, ErrorService } from '../../utils/services';

export abstract class SadCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('Sad')
  @Description('Hoy no es un buen dia, hay que esta triste.')
  async Sad(command: CommandMessage) {
    const userSelected = command.mentions.users.first();
    const embedMessage = new MessageEmbed();
    const happyAnime = (await this._tenorService.getRandom('Anime Sad')).body
      .results[0].media[0].gif.url;
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    if (userSelected) {
      switch (userSelected.username) {
        case ConfigurationBotEnum.NAME_BOT:
          embedMessage.setTitle(
            `Hmmm, hoy parece ser un mal dia, acompañame ${command.author.username}`,
          );
          embedMessage.setDescription(
            `Vamos a mi soledad a deprimirnos mas... </3`,
          );
          embedMessage.setImage(happyAnime);
          embedMessage.setFooter('La lombris ha muerto (▰˘︹˘▰)');

          try {
            await command.channel.send(embedMessage);
          } catch (error) {
            command.channel.send(
              this._errorService.showError(
                'Oh no, no he podido ponerme triste contigo. :(',
              ),
            );
          }
          break;
        default:
          embedMessage.setTitle(
            `Hola ${userSelected.username}, ponte triste conmigo ${command.author.username} tambien (▰˘︹˘▰)`,
          );
          embedMessage.setDescription(
            'Ya nada tiene sentido, ¿Porque seguimos aqui?',
          );
          embedMessage.setImage(happyAnime);
          embedMessage.setFooter('La lombris ha muerto (▰˘︹˘▰)');

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
      embedMessage.setTitle(`${command.author.username} se siente triste UnU`);
      embedMessage.setDescription(
        `Hola ${command.author.username}, soy yo ${ConfigurationBotEnum.NAME_BOT}, por favor no estes triste. :(`,
      );
      embedMessage.setImage(happyAnime);
      embedMessage.setFooter(
        'Ayudenlo por favor, o me deprimo tambien. (✖╭╮✖)',
      );

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
