import { MessageEmbed } from 'discord.js';

import { EmbedColorsEnum } from '../../../utils/enums';

export class ErrorService {
  public showError(description: string) {
    const embedMessage = new MessageEmbed();
    embedMessage.setTitle('Tenemos problemas (▰˘︹˘▰)');
    embedMessage.setFooter('Te he fallado, perdoname...');
    embedMessage.setDescription(description);
    embedMessage.setColor(EmbedColorsEnum.RED);
    return embedMessage;
  }
}
