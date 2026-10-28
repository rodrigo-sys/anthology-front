import { Status } from './Enums'

export interface Album {
  id: number
  title: string
  artistName: string
  releaseYear: number
  status: Status
}
