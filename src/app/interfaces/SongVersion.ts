import { Instrument, Status } from './Enums'

export interface SongVersion {
  id: number
  songId: number
  songTitle: string
  instrument: Instrument
  status: Status
  pdfUrl: string
}

export interface SongVersionRequest {
  instrument: Instrument
  file: File
}
