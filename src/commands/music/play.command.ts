import { Command, CommandMessage, Description } from '@typeit/discord';
import {
  Message,
  MessageEmbed,
  VoiceChannel,
  VoiceConnection,
} from 'discord.js';
import * as ytdl from 'ytdl-core';

import { EmbedColorsArray } from '../../utils/enums';
import { ErrorService, MusicService } from '../../utils/services';

export abstract class PlayMusicCommand {
  private _errorService: ErrorService = new ErrorService();
  private _musicService: MusicService = new MusicService();

  @Command('play add :youtube_url')
  @Description('Hace que Noa diga algo que quieras.')
  async PlayMusic(command: CommandMessage) {
    /* const { youtube_url, type } = command.args;
    const vcUser = command.member.voice.channel;
    const guildId = command.guild.id;

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
      await ytdl.getInfo(youtube_url).then((info) => {
        this.addToPlaylist(
          command,
          loadingMessage,
          connection,
          embedMessage,
          info,
          vcUser,
          guildId,
        );
      });
    });*/
  }

  /*private async addToPlaylist(
    command: CommandMessage,
    loadingMessage: Message,
    connection: VoiceConnection,
    embedMessage: MessageEmbed,
    videoInfo: ytdl.videoInfo,
    vcUser: VoiceChannel,
    guildId: string,
  ) {
    this._musicService.getPlaylist().filter(async (guild) => {
      if (guild.id == guildId) {
        this._musicService.addPlaylist(
          {
            title: videoInfo.videoDetails.title,
            length: `${
              Number(videoInfo.videoDetails.lengthSeconds) / 60
            } minutos\n`,
            likes: videoInfo.videoDetails.likes,
            rate:
              Math.round(
                (Number(videoInfo.videoDetails.averageRating) +
                  Number.EPSILON) *
                  100,
              ) / 100,
            author: videoInfo.videoDetails.author.name,
            request_by: command.author.username,
            video_url: videoInfo.videoDetails.video_url,
            thumbnail: videoInfo.videoDetails.thumbnail.thumbnails[3].url,
          },
          guildId,
        );

        if (guild.playlist.songs.length > 0) {
          guild.playlist.lastSongTitle = guild.playlist.songs[0].title;
        } else {
          guild.playlist.lastSongTitle =
            'Aun no se ha terminado de reproducir una cancion.';
        }

        let descriptionPlaylist = '';
        descriptionPlaylist += '**Se agrego a la playlist**\n';
        descriptionPlaylist += `${videoInfo.videoDetails.title}\n`;
        descriptionPlaylist += '\n';

        descriptionPlaylist += '**Duracion**\n';
        descriptionPlaylist += `${
          Number(videoInfo.videoDetails.lengthSeconds) / 60
        } minutos\n`;
        descriptionPlaylist += '\n';

        descriptionPlaylist += '**Se reproducira despues de**\n';
        descriptionPlaylist += `${guild.playlist.songs.length - 1} canciones\n`;
        descriptionPlaylist += '\n';

        descriptionPlaylist += '**Pedido por**\n';
        descriptionPlaylist += `${command.author.username}\n`;
        descriptionPlaylist += '\n';

        embedMessage.setDescription(descriptionPlaylist);
        embedMessage.setThumbnail(
          videoInfo.videoDetails.thumbnail.thumbnails[3].url,
        );

        try {
          await command.delete();
          await loadingMessage.delete();
          await command.channel.send(embedMessage);

          const dispatcher = connection;

          if (!guild.playlist.playing) {
            guild.playlist.playing = !guild.playlist.playing;
            const stream = ytdl(this.playlistGuild.songs[0].video_url, {
              filter: 'audioonly',
            });
            dispatcher.play(stream);
          }

          dispatcher.on('finish', () => {
            if (this.playlistGuild.songs.length < 0) {
              return vcUser.leave();
            }

            this.playlistGuild.songs.shift();
            const stream = ytdl(this.playlistGuild.songs[0].video_url, {
              filter: 'audioonly',
            });
            dispatcher.play(stream);
          });
        } catch (error) {
          command.channel.send(
            this._errorService.showError(
              'Oh no, no he podido reproducir la musica que has querido, perdoname... (｡•́︿•̀｡)',
            ),
          );
        }
      }
    });
  }*/
}
