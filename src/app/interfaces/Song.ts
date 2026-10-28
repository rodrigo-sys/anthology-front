import { Instrument, Status } from './Enums'

export interface Song{
  id: number
  title: string
  artistName: string
  genre: string
  AlbumTitle?: string
  ReleaseYear?: number
  availableInstruments: Instrument[]
  status: Status
}

export interface SongRequest {
  title: string;
  artistName: string;
  genre: string;
  albumId: number | null;
}

export interface SongUpdateRequest {
  title: string;
  artistName: string;
  genre: string;
  albumId: number | null;
}

export interface SongFilters {
  title?: string;
  genre?: string;
  artistName?: string;
  albumId?: number;
}


