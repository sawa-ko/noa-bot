import { Command, CommandMessage, Description } from '@typeit/discord';
import {
  Message,
  MessageEmbed,
  VoiceChannel,
  VoiceConnection,
} from 'discord.js';
import * as ytdl from 'ytdl-core';
import * as ytsr from 'yt-search';

import { EmbedColorsArray } from '../../utils/enums';
import { ErrorService } from '../../utils/services';
import { DatabaseService } from '../../utils/database';
import { MusicGuildsI } from '../../utils/interface';

export abstract class PlayMusicCommand {
  private _errorService: ErrorService = new ErrorService();
  private _databaseService: DatabaseService = new DatabaseService();

  @Command('play add')
  @Description('Hace que Noa diga algo que quieras.')
  async PlayMusic(command: CommandMessage) {
    const url_title = command.content.split(' ').splice(3).join(' ');
    const vcUser = command.member.voice.channel;
    const guildId = command.guild.id;
    const musicGuildDoc = this._databaseService
      .getCollection('music')
      .findOne({ guild_id: guildId });
    let youtubeUrlConverted = await ytsr(url_title);

    if (!musicGuildDoc) {
      try {
        const data: MusicGuildsI = {
          guild_id: guildId,
          playing: false,
          playlist: {
            lastSongTitle: null,
            currentSong: null,
            songs: [],
          },
        };
        const doc = await this._databaseService
          .getCollection('music')
          .insertOne(data);

        await this._databaseService.getCollection('music').update(doc);
      } catch (error) {
        return command.channel.send(
          this._errorService.showError(
            'Oh no, mi base de datos ha fallado, por favor reportalo con mi creador rapido. (⌣_⌣”)',
          ),
        );
      }
    }

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

    if (ytdl.validateURL(url_title)) {
      if (!ytdl.validateURL(url_title)) {
        return command.channel.send(
          this._errorService.showError(
            'Solo puedo reproducir videos de YouTube, lo siento. (｡•́︿•̀｡)',
          ),
        );
      }

      vcUser.join().then(async (connection) => {
        await ytdl.getInfo(url_title).then((info) => {
          this.addToPlaylist(
            command,
            loadingMessage,
            connection,
            embedMessage,
            info,
            vcUser,
            musicGuildDoc,
          );
        });
      });
    } else {
      if (!ytdl.validateURL(youtubeUrlConverted.videos[0].url)) {
        return command.channel.send(
          this._errorService.showError(
            'Solo puedo reproducir videos de YouTube, lo siento. (｡•́︿•̀｡)',
          ),
        );
      }

      vcUser.join().then(async (connection) => {
        await ytdl
          .getInfo(
            youtubeUrlConverted.videos[Math.floor(Math.random() * 6)].url,
          )
          .then((info) => {
            this.addToPlaylist(
              command,
              loadingMessage,
              connection,
              embedMessage,
              info,
              vcUser,
              musicGuildDoc,
            );
          });
      });
    }
  }

  private async addToPlaylist(
    command: CommandMessage,
    loadingMessage: Message,
    connection: VoiceConnection,
    embedMessage: MessageEmbed,
    videoInfo: ytdl.videoInfo,
    vcUser: VoiceChannel,
    musicGuildDoc: MusicGuildsI,
  ) {
    let playlistGuildDoc: MusicGuildsI = musicGuildDoc;
    let descriptionPlaylist = '';
    await command.delete();
    await loadingMessage.delete();

    playlistGuildDoc.playlist.songs = [
      ...playlistGuildDoc.playlist.songs,
      {
        title: videoInfo.videoDetails.title,
        length: `${
          Number(videoInfo.videoDetails.lengthSeconds) / 60
        } minutos\n`,
        likes: videoInfo.videoDetails.likes,
        rate:
          Math.round(
            (Number(videoInfo.videoDetails.averageRating) + Number.EPSILON) *
              100,
          ) / 100,
        author: videoInfo.videoDetails.author.name,
        request_by: command.author.username,
        video_url: videoInfo.videoDetails.video_url,
        thumbnail: videoInfo.videoDetails.thumbnail.thumbnails[3].url,
      },
    ];

    if (playlistGuildDoc.playlist.songs.length > 0) {
      playlistGuildDoc.playlist.lastSongTitle =
        playlistGuildDoc.playlist.songs[0].title;
    } else {
      playlistGuildDoc.playlist.lastSongTitle =
        'Aun no se ha terminado de reproducir una cancion.';
    }

    descriptionPlaylist += '**Reproduciendo**\n';
    descriptionPlaylist += `${videoInfo.videoDetails.title}\n`;
    descriptionPlaylist += '\n';

    descriptionPlaylist += '**Duracion**\n';
    descriptionPlaylist += `${
      Number(videoInfo.videoDetails.lengthSeconds) / 60
    } minutos\n`;
    descriptionPlaylist += '\n';

    descriptionPlaylist += '**Pedido por**\n';
    descriptionPlaylist += `${command.author.username}\n`;
    descriptionPlaylist += '\n';

    descriptionPlaylist += '**Agregar mas canciones**\n';
    descriptionPlaylist +=
      'Puedes hacerlo con el comando *noa play add [video]* y se agregara a la playlist.';
    embedMessage.setDescription(descriptionPlaylist);
    embedMessage.setThumbnail(
      videoInfo.videoDetails.thumbnail.thumbnails[3].url,
    );

    try {
      playlistGuildDoc.playlist.currentSong = videoInfo.videoDetails.title;
      playlistGuildDoc.playing = true;
      await this._databaseService
        .getCollection('music')
        .update(playlistGuildDoc);

      if (playlistGuildDoc.playlist.songs.length == 1) {
        await command.channel.send(embedMessage);
        const stream = ytdl(videoInfo.videoDetails.video_url, {
          filter: 'audioonly',
        });

        connection.play(stream).on('finish', () => {
          this.playOnFinish(
            playlistGuildDoc,
            vcUser,
            command,
            embedMessage,
            connection,
          );
        });
      }
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'Oh no, no he podido reproducir la musica que has querido, perdoname... (｡•́︿•̀｡)',
        ),
      );
    }

    if (playlistGuildDoc.playing) {
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
      descriptionPlaylist += `${playlistGuildDoc.playlist.songs.length} canciones\n`;
      descriptionPlaylist += '\n';

      descriptionPlaylist += '**Pedido por**\n';
      descriptionPlaylist += `${command.author.username}\n`;
      descriptionPlaylist += '\n';

      embedMessage.setDescription(descriptionPlaylist);
      embedMessage.setThumbnail(
        videoInfo.videoDetails.thumbnail.thumbnails[3].url,
      );

      embedMessage.setDescription(descriptionPlaylist);
      command.channel.send(embedMessage);
    }
  }

  private async playOnFinish(
    playlistGuildDoc: MusicGuildsI,
    vcUser: VoiceChannel,
    command: CommandMessage,
    embedMessage: MessageEmbed,
    connection: VoiceConnection,
  ) {
    if (playlistGuildDoc.playlist.songs.length >= 1) {
      playlistGuildDoc.playlist.lastSongTitle =
        playlistGuildDoc.playlist.songs[0].title;
    }

    if (playlistGuildDoc.playlist.songs.length == 0) {
      playlistGuildDoc.playing = false;
      return vcUser.leave();
    }

    if (vcUser.members.size == 0) {
      return vcUser.leave();
    }

    playlistGuildDoc.playlist.songs.shift();
    let descriptionPlaylist = '';
    descriptionPlaylist += '**Reproduciendo ahora**\n';
    descriptionPlaylist += `${playlistGuildDoc.playlist.songs[0].title}\n`;
    descriptionPlaylist += '\n';

    descriptionPlaylist += '**Pedido por**\n';
    descriptionPlaylist += `${playlistGuildDoc.playlist.songs[0].author}\n`;
    descriptionPlaylist += '\n';

    descriptionPlaylist += '**Duracion**\n';
    descriptionPlaylist += `${
      Number(playlistGuildDoc.playlist.songs[0].length) / 60
    } minutos\n`;
    descriptionPlaylist += '\n';

    if (playlistGuildDoc.playlist.songs.length >= 1) {
      descriptionPlaylist += '**Siguiente cancion**\n';
      descriptionPlaylist += `${playlistGuildDoc.playlist.songs[1].title}\n`;
      descriptionPlaylist += '\n';

      descriptionPlaylist += '**Pedido por**\n';
      descriptionPlaylist += `${playlistGuildDoc.playlist.songs[1].request_by}`;

      embedMessage.setDescription(descriptionPlaylist);
      embedMessage.setThumbnail(playlistGuildDoc.playlist.songs[1].thumbnail);
    }

    descriptionPlaylist += '**Siguiente cancion**\n';
    descriptionPlaylist += `No hay mas canciones`;
    descriptionPlaylist += '\n';

    descriptionPlaylist +=
      '**¿Quieres seguir escuchando mas canciones conmigo?**\n';
    descriptionPlaylist +=
      'Puedes hacerlo con el comando *noa play add [video]* pequeño Onni-Chan y se agregara a la playlist.';

    embedMessage.setDescription(descriptionPlaylist);
    embedMessage.setThumbnail(playlistGuildDoc.playlist.songs[1].thumbnail);

    try {
      playlistGuildDoc.playlist.currentSong =
        playlistGuildDoc.playlist.songs[0].thumbnail;
      await await this._databaseService
        .getCollection('music')
        .update(playlistGuildDoc);
      await command.channel.send(embedMessage);

      const stream = ytdl(playlistGuildDoc.playlist.songs[0].video_url, {
        filter: 'audioonly',
      });

      connection.play(stream).on('finish', () => {
        this.playOnFinish(
          playlistGuildDoc,
          vcUser,
          command,
          embedMessage,
          connection,
        );
      });
    } catch (error) {
      command.channel.send(
        this._errorService.showError(
          'Oh no, no he podido reproducir la musica que has querido, perdoname... (｡•́︿•̀｡)',
        ),
      );
    }
  }
}
