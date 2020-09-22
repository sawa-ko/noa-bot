import { Command, Description, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';

import { TenorService, ErrorService } from '../../utils/services';
import { ConfigurationBotEnum } from '../../utils/enums';

export abstract class AngryCommand {
  private _tenorService: TenorService = new TenorService();
  private _errorService: ErrorService = new ErrorService();

  @Command('angry')
  @Description(
    'Muestra a otros usuarios que estás enojado o enojado con otra persona.',
  )
  async Angry(command: CommandMessage) {
    const userSelected = command.mentions.users.first();
    const animeAngry = (await this._tenorService.getRandom('Anime Angry', 1))
      .body.results[0].media[0].gif.url;
    const embedMessage = new MessageEmbed();

    if (userSelected) {
      switch (userSelected.username) {
        case ConfigurationBotEnum.NAME_BOT:
          embedMessage.setTitle(
            `¡No puedes enojarte conmigo ${command.author.username} WAHAHA!`,
          );
          embedMessage.setDescription(
            'No te permitire esto, yo no he hecho nada malo. (>_<)',
          );
          embedMessage.setFooter('¡Detén la violencia!');
          try {
            await command.channel.send(embedMessage);
          } catch (error) {
            command.channel.send(
              this._errorService.showError(
                'Oh no, no te he podido poner en modo enojado porque he fallado, pero entonces ahora ponte en modo feliz. ¡Yeii!',
              ),
            );
          }
          break;
        case command.author.username:
          embedMessage.setTitle(
            `No puedes enojarte contigo mismo pequeño Onni-Chan raro`,
          );
          embedMessage.setDescription(
            '¿Que te parece tomar algo de cafe? Parece que estas confundido. (¬ω¬)',
          );
          embedMessage.setFooter('¡Detén la violencia!');
          try {
            await command.channel.send(embedMessage);
          } catch (error) {
            command.channel.send(
              this._errorService.showError(
                'Oh no, no te he podido poner en modo enojado porque he fallado, pero entonces ahora ponte en modo feliz. ¡Yeii!',
              ),
            );
          }
          break;
        default:
          embedMessage.setTitle(
            `No puede ser ${command.author.username} esta enojado con ${userSelected.username}`,
          );
          embedMessage.setDescription(
            'Por favor no peleen enfrete de mi o llorare. (▰︶︹︺▰)',
          );
          embedMessage.setImage(animeAngry);
          embedMessage.setFooter('¡Detén la violencia!');
          try {
            await command.channel.send(embedMessage);
          } catch (error) {
            command.channel.send(
              this._errorService.showError(
                'Oh no, no te he podido poner en modo enojado porque he fallado, pero entonces ahora ponte en modo feliz. ¡Yeii!',
              ),
            );
          }
          break;
      }
    } else {
      embedMessage.setTitle(
        `No puede ser ${command.author.username} esta enojado`,
      );
      embedMessage.setDescription(
        'Por favor no te enojes. hay que estar siempre felices... </3',
      );
      embedMessage.setImage(animeAngry);
      embedMessage.setFooter('¡Detén la violencia!');
      try {
        await command.channel.send(embedMessage);
      } catch (error) {
        command.channel.send(
          this._errorService.showError(
            'Oh no, no te he podido poner en modo enojado porque he fallado, pero entonces ahora ponte en modo feliz. ¡Yeii!',
          ),
        );
      }
    }
  }
}
