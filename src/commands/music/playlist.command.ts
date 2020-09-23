import { Command, CommandMessage, Description } from '@typeit/discord';

import { ErrorService, MusicService } from '../../utils/services';

export abstract class PlaylistCommand {
  private _errorService: ErrorService = new ErrorService();
  private _musicService: MusicService = new MusicService();

  @Command('play list')
  @Description('Hace que Noa diga algo que quieras.')
  async Playlist(command: CommandMessage) {}
}
