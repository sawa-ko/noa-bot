import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { TenorService, ErrorService } from '../../utils/services';

export abstract class AngryCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('kiss')
  @Description('Besa a otro usuario o besame a mi.')
  async Kiss(command: CommandMessage) {
    const userSelected = command.mentions.users.first();
    const embedMessage = new MessageEmbed();
    const bakaAnime = (await this._tenorService.getRandom('Anime Kiss')).body
      .results[0].media[0].gif.url;
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    if (!userSelected) {
      return command.reply(
        this._errorService.showError(
          'Lo siento Onii-Chan, pero tienes que besar a alguien, no a un fastasma. ◑.◑',
        ),
      );
    }

    switch (userSelected.username) {
      case ConfigurationBotEnum.NAME_BOT:
        embedMessage.setTitle('Ay! Me has besado, o-onni-chan malo');
        embedMessage.setDescription(
          `Por favor no vuelvas a hacer eso ${command.author.username} o morire... >.<`,
        );
        embedMessage.setImage(
          'https://media1.tenor.com/images/f72035e032125a5395883b8d68d9df5d/tenor.gif?itemid=16149781',
        );
        embedMessage.setFooter('Es-estoy apenada~~');

        command.channel.send(embedMessage);
        break;
      case command.author.username:
        command.reply(
          this._errorService.showError(
            'Lo siento Onii-Chan, pero no puedes darte un beso a ti mismo. OwO',
          ),
        );
        break;
      default:
        embedMessage.setTitle(
          `${command.author.username} ha besado a ${userSelected.username} OwO`,
        );
        embedMessage.setDescription(
          '¡Preparen una boda que ya tenemos nuevo ship! Quiero que todos estemos ahi, capturen este momento por favor.',
        );
        embedMessage.setImage(bakaAnime);
        embedMessage.setFooter('¡Que vivan los novios!');

        command.channel.send(embedMessage);
        break;
    }
  }
}
