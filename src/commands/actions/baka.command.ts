import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import {
  ConfigurationBotEnum,
  EmbedColorsArray,
  EmbedColorsEnum,
} from '../../utils/enums';
import { TenorService, ErrorService } from '../../utils/services';

export abstract class AngryCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('baka')
  @Description('Dile Baka a otro usuario porque se lo merece.')
  async Baka(command: CommandMessage) {
    const userSelected = command.mentions.users.first();
    const embedMessage = new MessageEmbed();
    const bakaAnime = (await this._tenorService.getRandom('Anime Baka', 1)).body
      .results[0].media[0].gif.url;
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    if (!userSelected) {
      return command.reply(
        this._errorService.showError(
          'Lo siento Onii-Chan, pero tienes que decirle Baka a alguien, no a un fastasma. ◑.◑',
        ),
      );
    }

    switch (userSelected.username) {
      case ConfigurationBotEnum.NAME_BOT:
        embedMessage.setColor(EmbedColorsEnum.RED);
        embedMessage.setTitle('Jeje, no te dejare decirme eso ＼(｀0´)／');
        embedMessage.setDescription(
          'Como te atreves a retarme, no te lo perdonare, ¡¡Nunca!!',
        );
        embedMessage.setFooter('Comando imperdodable');

        command.channel.send(embedMessage);
        break;
      case command.author.username:
        command.reply(
          this._errorService.showError(
            'Lo siento Onii-Chan, pero no puedes decirte Baka a ti mismo. ◑.◑',
          ),
        );
        break;
      default:
        embedMessage.setTitle(
          `¡OMG! ${command.author.username} le ha dicho Baka a ${userSelected.username}`,
        );
        embedMessage.setDescription(
          'Algo totalmente epico, creo que los baneare ahora jeje. (̂ ˃̥̥̥ ˑ̫ ˂̥̥̥ )̂',
        );
        embedMessage.setImage(bakaAnime);
        embedMessage.setFooter('Returbio esto amigo');

        command.channel.send(embedMessage);
        break;
    }
  }
}
