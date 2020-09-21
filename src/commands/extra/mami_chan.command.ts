import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { ErrorService } from '../../utils/services/error/error.service';
import { TenorService } from '../../utils/services';

export abstract class MamiChanCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('mamichan')
  @Description('Muestra una imagen random de la hermosa Mami Chan.')
  async MamiChan(command: CommandMessage) {
    const MamiChan =
      'https://media1.tenor.com/images/4cffbddb093cc1138143268129fc61f3/tenor.gif?itemid=18518348';

    const embedMessage = new MessageEmbed();
    embedMessage.setTitle('Solo observa que hermosa es Mami Chan 7u7');
    embedMessage.setDescription(
      'Observa esta belleza conmigo pequeña personita, solo observa esta maravilla malefica. OwO',
    );
    embedMessage.setImage(MamiChan);
    embedMessage.setFooter('Pero que chinge a su madre...');

    try {
      await command.channel.send(embedMessage);
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido enviarte una imagen sobre la hermosa que es Mami Chan, por favor vuelve a intentarlo. (⌣_⌣”)',
        ),
      );
    }
  }
}
