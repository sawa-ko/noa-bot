import { CommandMessage } from '@typeit/discord';
import { VoiceChannel, VoiceConnection } from 'discord.js';

export interface MusicGuildsI {
  guild_id: string;
  playlist: PlaylistI;
  playing: boolean;
}

export interface SongsI {
  title: string;
  length: string;
  likes: number;
  rate: number;
  author: string;
  request_by: string;
  video_url: string;
  thumbnail: string;
}

interface PlaylistI {
  lastSongTitle: string;
  currentSong: string;
  songs: SongsI[];
}
