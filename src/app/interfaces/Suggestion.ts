export type SuggestionStatus = 'PENDING' | 'ADDED' | 'REJECTED';

export interface SongSuggestionRequest {
  idUser?: number;
  title: string;
  artistName: string;
  notes: string;
}

export interface SongSuggestionResponse {
  id: number;
  idUser: number;
  title: string;
  artistName: string;
  notes: string;
  status: SuggestionStatus;
  createdAt: string;
}
