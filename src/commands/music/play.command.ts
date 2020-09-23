import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';
import * as ytdl from 'ytdl-core';

import { EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';

export abstract class PlayMusicCommand {
  private _errorService: ErrorService = new ErrorService();

  @Command('play :youtube_url')
  @Description('Hace que Noa diga algo que quieras.')
  async PlayMusic(command: CommandMessage) {
    const { youtube_url, type } = command.args;
    const vcUser = command.member.voice.channel;
    const embedMessage = new MessageEmbed();
    embedMessage.setColor(
      EmbedColorsArray[Math.floor(Math.random() * EmbedColorsArray.length)],
    );
    embedMessage.setTitle('Reproductor de musica');
    const loadingMessage = await command.reply(
      'Esperame, estoy cargando tu musica...',
    );

    if (!vcUser) {
      return command.channel.send(
        this._errorService.showError(
          'Jeje necesito que te conectes a un **canal de voz** para escuchar musica contigo Onni-Chan. (⌣_⌣”)',
        ),
      );
    }

    if (!ytdl.validateURL(youtube_url)) {
      return command.channel.send(
        this._errorService.showError(
          'Solo puedo reproducir videos de YouTube, lo siento. (｡•́︿•̀｡)',
        ),
      );
    }

    vcUser.join().then(async (connection) => {
      const stream = ytdl(youtube_url, {
        filter: 'audioonly',
      });
      await ytdl.getInfo(youtube_url).then((info) => {
        let descriptionmusic = '';
        descriptionmusic += '**Titulo**\n';
        descriptionmusic += `${info.videoDetails.title}\n`;
        descriptionmusic += '\n';

        descriptionmusic += '**Duración**\n';
        descriptionmusic += `${
          Number(info.videoDetails.lengthSeconds) / 60
        } minutos\n`;
        descriptionmusic += '\n';

        descriptionmusic += '**Pedido por**\n';
        descriptionmusic += `${command.author.username}\n`;
        descriptionmusic += '\n';
        embedMessage.setThumbnail(
          info.videoDetails.thumbnail.thumbnails[3].url,
        );
        embedMessage.setDescription(descriptionmusic);
        embedMessage.setFooter(
          `Likes: ${info.videoDetails.likes} ~ Rate: ${
            Math.round(
              (Number(info.videoDetails.averageRating) + Number.EPSILON) * 100,
            ) / 100
          } ~ Por: ${info.videoDetails.author.name}`,
        );
      });

      try {
        await command.delete();
        await loadingMessage.delete();
        await command.channel.send(embedMessage);
        const dispatcher = connection.play(stream);
        dispatcher.on('finish', () => vcUser.leave());
      } catch (error) {
        command.channel.send(
          this._errorService.showError(
            'Oh no, no he podido reproducir la musica que has querido, perdoname... (｡•́︿•̀｡)',
          ),
        );
      }
    });
  }
}
