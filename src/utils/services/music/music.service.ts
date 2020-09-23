import { MusicGuildsI, SongsI } from '../../../utils/interface';

export class MusicService {
  public musicPlaylistGuild: MusicGuildsI[];

  constructor() {}

  public getPlaylist() {
    return this.musicPlaylistGuild;
  }
}
