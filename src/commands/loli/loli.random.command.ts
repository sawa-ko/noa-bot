import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { TenorService, ErrorService } from '../../utils/services';
import { EmbedColorsArray } from '../../utils/enums';

export abstract class MamiChanCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('loli')
  @Description('Te muestra una Loli que te quiere mucho.')
  async LoliLove(command: CommandMessage) {
    const loliLove = (await this._tenorService.getRandom('loli anime', 20)).body
      .results;
    const loliLoveSelected =
      loliLove[Math.floor(Math.random() * loliLove.length)].media[0].gif.url;

    const embedMessage = new MessageEmbed();
    embedMessage.setTitle('Tenga a su Loli, cuidela, lo ama mucho <3');
    embedMessage.setDescription(
      'Si no la cuida le ira mal, tenga cuidado. ┌(▀Ĺ̯ ▀-͠ )┐',
    );
    embedMessage.setImage(loliLoveSelected);
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );
    embedMessage.setFooter('¡Lolis gratis para todos!');

    try {
      await command.channel.send(embedMessage);
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido enviarte la Loli que te ama mucho, por favor vuelve a intentarlo. (⌣_⌣”)',
        ),
      );
    }
  }
}
