import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { EmbedColorsArray } from '../../utils/enums';
import { ErrorService, TenorService } from '../../utils/services';

export abstract class HentaiCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('hentai')
  @Description('Hace que Noa diga algo que quieras.')
  async Hentai(command: CommandMessage) {
    const loliPolice = (
      await this._tenorService.getRandom('Anime Triggered', 1)
    ).body.results[0].media[0].gif.url;
    const embedMessage = new MessageEmbed();
    embedMessage.setTitle(`Vaya vaya, que tenemos aqui ( ⚆ _ ⚆ )`);
    embedMessage.setDescription(
      'Onni-Chan puerco, por favor llamen a los administradores, no debemos dejar que nos infecte con su perversión. Mis Onni-Chan son inocentes.',
    );
    embedMessage.setImage(loliPolice);
    embedMessage.setFooter('¡Muy mal ahi, he!');
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    try {
      await command.channel.send(embedMessage);
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido enviarte tu contenido pervertido, pe-perdoname.... (⌣_⌣”)',
        ),
      );
    }
  }
}
