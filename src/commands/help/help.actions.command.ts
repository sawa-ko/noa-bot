import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class MamiChanCommand {
  private _errorService: ErrorService = new ErrorService();

  @Command('h actions')
  @Description(
    'Mostrar información sobre lo que puedo hacer. Muy útil este comando si no sabes cómo usar lo que puedo hacer.',
  )
  async MamiChan(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp +=
      'Demuestrasle a los demas usuarios tus mas oscuros sentimientos WAHAHA.\n';
    descriptionHelp += '\n';
    descriptionHelp += '🤜 **noa angry [usuario - opcional]**\n';
    descriptionHelp +=
      '=> Muestrale a los demas con quien estas enojado o si tu estas enojado.\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa baka [usuario - requerido]**\n';
    descriptionHelp += '=> Dile a otro usuario lo Baka que es.\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa bite [usuario - requerido]**\n';
    descriptionHelp +=
      '=> Muerde a otro usuario, pero ten cuidado, activara tu modo raro.\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa kiss [usuario - requerido]**\n';
    descriptionHelp += '=> Besa a otro usuario y, ¡que vivan los novios!\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa happy [usuario - opcional]**\n';
    descriptionHelp += '=> Ponte feliz con otro usuario o ponte feliz tu. ❤\n';
    descriptionHelp += '\n';

    descriptionHelp += '🤜 **noa sad [usuario - opcional]**\n';
    descriptionHelp += '=> El comando mas triste que tengo. UnU\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(
      'https://i.ibb.co/HGpm6Rh/118884326-101951864986516-1661613338635869054-n.jpg',
    );
    embedMessage.setTitle('Comandos de acciones');
    embedMessage.setDescription(descriptionHelp);
    embedMessage.setFooter(
      'Si aun tienes problemas, contacta a mi creador @kaname#0001',
    );
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );

    try {
      await command.channel.send(embedMessage);
      await command.channel;
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'No he podido hacer lo que querias Onii-Chan, por favor vuelve a intentarlo. (⌣_⌣”)',
        ),
      );
    }
  }
}
