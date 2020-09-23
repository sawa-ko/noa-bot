import { PlaylistGuilds, Songs } from '../../../utils/interface';

export class MusicService {
  public musicPlaylistGuild: PlaylistGuilds[];

  constructor() {}

  public getPlaylist() {
    return this.musicPlaylistGuild;
  }

  public addPlaylist(song: Songs, guildId: string) {
    this.musicPlaylistGuild.filter((guild) => {
      if (guildId == guild.id) {
        if (!this.musicPlaylistGuild.filter((guild) => guild.id == guildId)) {
          const playlist = {
            lastSongTitle: null,
            currentSong: null,
            playing: false,
            songs: [],
          };
          this.musicPlaylistGuild.push({ id: guildId, playlist });
        }

        return guild.playlist.songs.push(song);
      }
    });
  }
}
