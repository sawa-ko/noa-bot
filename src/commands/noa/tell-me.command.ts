import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';
import * as translate from '@vitalets/google-translate-api';

import { ConfigurationBotEnum, EmbedColorsArray } from '../../utils/enums';
import { AnimeQuotesService, ErrorService } from '../../utils/services';

export abstract class TellMeCommand {
  private _errorService: ErrorService = new ErrorService();
  private _animeQuotesService: AnimeQuotesService = new AnimeQuotesService();

  @Command('tellme')
  @Description('Noa te dice algo bonito.')
  async TellMe(command: CommandMessage) {
    const animeQuote = (await this._animeQuotesService.getRandomAnimeQuote())
      .body.data[0];

    const message = await command.reply(
      'Esperame por favor, estoy pensando...',
    );

    translate(animeQuote.quote, { from: 'en', to: 'es' })
      .then(async (translation: { text: string }) => {
        await message.delete();
        const embedMessagePubic = new MessageEmbed();
        embedMessagePubic.setTitle(
          `Listo ${command.author.username}, Onni~~Onii-Chan, revisa nuestra conversación`,
        );
        embedMessagePubic.setDescription(
          'Espero te guste lo que te envie, me siento apenada. >.<',
        );
        embedMessagePubic.setFooter(
          'Por favor, no me hagas decir mucho estas cosas, me da mucha verguenza...',
        );
        embedMessagePubic.setColor(
          EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
        );

        const embedMessagePrivate = new MessageEmbed();
        embedMessagePrivate.setTitle(
          `${animeQuote.character} ~ ${animeQuote.anime}`,
        );
        embedMessagePrivate.setDescription(translation.text);
        embedMessagePrivate.setColor(
          EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
        );
        embedMessagePrivate.setThumbnail(ConfigurationBotEnum.PHOTO_BOT);
        embedMessagePrivate.setFooter(
          `Espero te haya gustado ${command.author.username}, me-me esforce mucho~~`,
        );

        try {
          await command.channel.send(embedMessagePubic);
          await command.author.send(embedMessagePrivate);
        } catch (error) {
          command.channel.send(
            this._errorService.showError(
              'Lo-lo siento, me dio mucha verguenza y no pude decirte nada, perdoname por favor. (⌣_⌣”)',
            ),
          );
        }
      })
      .catch(async ({ message }) => {
        await message.delete();
        command.channel.send(
          this._errorService.showError(
            'Lo-lo siento, me dio mucha verguenza y no pude decirte nada, perdoname por favor. (⌣_⌣”)',
          ),
        );
      });
  }
}
