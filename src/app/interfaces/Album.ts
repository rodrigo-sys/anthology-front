import { Status } from './Enums'

export interface Album {
  id: number
  title: string
  artistName: string
  releaseYear: number
  status: Status
}

export interface AlbumRequest {
  title: string
  artistName: string
  releaseYear: number
}

export interface AlbumUpdateRequest {
  title?: string
  artistName?: string
  releaseYear?: number
}
