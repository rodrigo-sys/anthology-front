export type Status = 'PENDING' | 'APPROVED' | 'REJECTED'

export type Instrument = 'GUITAR' | 'BASS' | 'PIANO'

export type Role = 'ADMIN' | 'USER' | 'ARTIST'

export const INSTRUMENTS: Instrument[] = ['GUITAR', 'BASS', 'PIANO']

export const INSTRUMENT_LABEL: Record<Instrument, string> = {
  GUITAR: 'Guitarra',
  BASS: 'Bajo',
  PIANO: 'Piano',
}

export const STATUS_LABEL: Record<Status, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
}
