import { MessageEmbed } from 'discord.js';
import { EmbedColorsEnum } from 'src/utils/enums/embed.colors.enum';

export class ErrorService {
  public showError(description: string) {
    const embedMessage = new MessageEmbed();
    embedMessage.setTitle('No puede ser (▰˘︹˘▰)');
    embedMessage.setFooter('Te he fallado, perdoname...');
    embedMessage.setDescription(description);
    embedMessage.setColor(EmbedColorsEnum.RED);
    return embedMessage;
  }
}
