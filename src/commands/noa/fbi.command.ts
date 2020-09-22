import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { EmbedColorsArray } from '../../utils/enums';
import { ErrorService, TenorService } from '../../utils/services';

export abstract class FbiCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('fbi')
  @Description('Hace que Noa diga algo que quieras.')
  async FbiCommand(command: CommandMessage) {
    const fbiOpenUp = (await this._tenorService.getRandom('FBI Loli', 1)).body
      .results[0].media[0].gif.url;
    const embedMessage = new MessageEmbed();
    embedMessage.setTitle(
      `¡HECHO ${command.author.username}! Ten cuidadoooooo OwO`,
    );
    embedMessage.setDescription(
      'He llamado al FBI pequeño Onni-Chan malo, ten cuidadoooooo.\n( ⚆ _ ⚆ )',
    );
    embedMessage.setImage(fbiOpenUp);
    embedMessage.setFooter('¡Mas suerte a la proxima vez!');
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    try {
      await command.channel.send(embedMessage);
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido llamar al FBI Onni-Chan, pe-perdoname.... (⌣_⌣”)',
        ),
      );
    }
  }
}
