export type Status = 'PENDING' | 'APPROVED' | 'REJECTED'

export type Instrument = 'GUITAR' | 'BASS' | 'PIANO'

export const INSTRUMENTS: Instrument[] = ['GUITAR', 'BASS', 'PIANO']

export const INSTRUMENT_LABEL: Record<Instrument, string> = {
  GUITAR: 'Guitarra',
  BASS: 'Bajo',
  PIANO: 'Piano',
}
