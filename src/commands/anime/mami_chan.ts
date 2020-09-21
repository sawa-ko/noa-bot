import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { GiphyService } from '../../utils/services';

export abstract class MamiChanCommand {
  private _giphyService: GiphyService = new GiphyService();

  @Command('mamichan')
  @Description('Muestra una imagen random de la hermosa Mami Chan.')
  async bye(command: CommandMessage) {
    const reponse = (
      await this._giphyService.getAnimeGifByName('Kanojo, Okarishimasu')
    ).body;

    const embedMessage = new MessageEmbed();
    embedMessage.setTitle('Solo observa que hermosa es Mami Chan');
    embedMessage.setDescription(
      'Observa esta belleza conmigo pequeña personita, solo observa esta maravilla malefica. OwO',
    );
    embedMessage.setImage(reponse.data[0].images.original.url);
    embedMessage.setFooter('Pero que chinge a su madre...');

    try {
      await command.channel.send(embedMessage);
    } catch (error) {
      const embedMessage = new MessageEmbed();
      embedMessage.setTitle('No puede ser (▰˘︹˘▰)');
      embedMessage.setFooter('Te he fallado, perdoname...');
      embedMessage.setDescription(
        'No he podido enviarte una imagen sobre la hermosa que es Mami Chan, por favor vuelve a intentarlo. (⌣_⌣”)',
      );
      command.reply(embedMessage);
    }
  }
}
