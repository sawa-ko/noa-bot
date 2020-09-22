import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import {
  ConfigurationBotEnum,
  EmbedColorsArray,
  EmbedColorsEnum,
} from '../../utils/enums';
import { TenorService, ErrorService } from '../../utils/services';

export abstract class BiteCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('bite')
  @Description('Muerde a otro usuario y o deja que yo te muerda WAHAHA.')
  async Bite(command: CommandMessage) {
    const userSelected = command.mentions.users.first();
    const embedMessage = new MessageEmbed();
    const biteAnime = (await this._tenorService.getRandom('Anime Bite', 1)).body
      .results[0].media[0].gif.url;
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    if (!userSelected) {
      return command.reply(
        this._errorService.showError(
          'Lo siento Onii-Chan, si te muerdes solo vas a llorar jeje.',
        ),
      );
    }

    switch (userSelected.username) {
      case ConfigurationBotEnum.NAME_BOT:
        embedMessage.setColor(EmbedColorsEnum.RED);
        embedMessage.setTitle(
          `Uy, ${command.author.username} me ha mordido (ﾉ~o~)ﾉ`,
        );
        embedMessage.setDescription('Esto se va a poner feo...');
        embedMessage.setImage(biteAnime);
        embedMessage.setFooter('Me siento extraña, ¿Me convertire en Zombie?');

        command.channel.send(embedMessage);
        break;
      case command.author.username:
        command.reply(
          this._errorService.showError(
            'Lo siento Onii-Chan, pero no puedes morderte a ti mismo. >.<',
          ),
        );
        break;
      default:
        embedMessage.setTitle(
          `Cuidado todos, ${command.author.username} se ha puesto en modo raro y ha mordido a ${userSelected.username}`,
        );
        embedMessage.setDescription(
          'Les recomiendo usar su filtro anti-raro para evitar ser mordidos. \n( ⚆ _ ⚆ )',
        );
        embedMessage.setImage(biteAnime);

        command.channel.send(embedMessage);
        break;
    }
  }
}
