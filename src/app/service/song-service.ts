import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { Song } from '../interfaces/Song';
import { Instrument } from '../interfaces/Enums';

@Service()
export class SongService {
  http = inject(HttpClient)
  auth = inject(AuthService)
  url = '/api/songs'

  songs = signal<Song[]>([])
  song = signal<Song | null>(null)
  songEditando = signal<Song | null>(null)
  error = signal('')

  

}
