export type SuggestionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ADDED';

export interface SongSuggestionRequest {
  title: string;
  artistName: string;
  genre: string;
}

export interface SongSuggestionResponse {
  id: number;
  title: string;
  artistName: string;
  genre: string;
  status: SuggestionStatus;
  createdAt: string;
}
