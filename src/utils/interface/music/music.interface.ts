export interface PlaylistGuilds {
  id: string;
  playlist: playlist;
}

export interface Songs {
  title: string;
  length: string;
  likes: number;
  rate: number;
  author: string;
  request_by: string;
  video_url: string;
  thumbnail: string;
}

interface playlist {
  lastSongTitle: string;
  currentSong: string;
  playing: boolean;
  songs: Songs[];
}
