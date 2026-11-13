export interface CommentRequest {
  idUser?: number;
  SongVersion: number;
  content: string;
}

export interface CommentResponse {
  id: number;
  username: string;
  songTitle: string;
  instrument: 'GUITAR' | 'BASS' | 'PIANO';
  content: string;
  createdAt: string;
}
