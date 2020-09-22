import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class Help {
  private _errorService: ErrorService = new ErrorService();

  @Command('help')
  @Description(
    'Mostrar información sobre lo que puedo hacer. Muy útil este comando si no sabes cómo usar lo que puedo hacer.',
  )
  async Help(command: CommandMessage) {
    const embedMessage = new MessageEmbed();
    let descriptionHelp = '';
    descriptionHelp +=
      'Estos son mis comandos, esta soy yo, por favor ten cuidado que puedes lastimarme si usas demasiado mis funciones. Te quiero. <3\n';
    descriptionHelp += '\n';

    descriptionHelp += '🐱‍👤 **noa h actions**\n';
    descriptionHelp +=
      '=> Muestra los comandos de acciones que tengo disponible.\n';
    descriptionHelp += '\n';

    descriptionHelp += '✨ **noa h loli**\n';
    descriptionHelp +=
      '=> Muestra los comandos sobre Lolis gratis para todos, ¡Yeii!\n';
    descriptionHelp += '\n';

    descriptionHelp += '🐱‍🐉 **noa h noa**\n';
    descriptionHelp += '=> ¿Quieres que haga algo por ti? Mira mis comandos\n';
    descriptionHelp += '\n';

    descriptionHelp += '❓ **noa h extra**\n';
    descriptionHelp += '=> Muestra comandos un poco turbios bro.\n';
    descriptionHelp += '\n';

    descriptionHelp += '🛑 **noa h warning**\n';
    descriptionHelp += '=> No uses estos comandos, por favor.\n';
    descriptionHelp += '\n';

    embedMessage.setThumbnail(
      'https://i.ibb.co/HGpm6Rh/118884326-101951864986516-1661613338635869054-n.jpg',
    );
    embedMessage.setTitle(
      `Hola ${command.author.username}, esto es lo que puedo hacer <3`,
    );
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
