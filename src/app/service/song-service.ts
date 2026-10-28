import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Instrument, Status } from '../interfaces/Enums';
import { Song, SongFilters, SongRequest, SongUpdateRequest } from '../interfaces/Song';


@Service()
export class SongService {
  private http = inject(HttpClient);
  private readonly url = '/api/songs';

  songs = signal<Song[]>([]);
  song = signal<Song | null>(null);
  songEditando = signal<Song | null>(null);
  instrumento = signal<Instrument | ''>('');
  error = signal('');
  cargando = signal(false);


  songsFiltradas = computed(() => {
    const instrumento = this.instrumento();
    if (!instrumento) return this.songs();
    return this.songs().filter((song) => song.availableInstruments.includes(instrumento));
  });

  private ultimaLista: {
    tipo: 'todas' | 'estado';
    filtros?: SongFilters;
    status?: Status;
  } = { tipo: 'todas', filtros: {} };


  listSongs(filtros: SongFilters = {}) {
    this.ultimaLista = { tipo: 'todas', filtros };
    this.cargar(this.http.get<Song[]>(this.url, { params: this.aParams(filtros) }));
  }

  listByStatus(status: Status) {
    this.ultimaLista = { tipo: 'estado', status };
    this.cargar(this.http.get<Song[]>(`${this.url}/status`, { params: { status } }));
  }

  
  getSong(id: number) {
    if (this.song()?.id !== id) this.song.set(null);
    this.error.set('');
    this.http.get<Song>(`${this.url}/${id}`).subscribe({
      next: (data) => this.song.set(data),
      error: () => this.error.set('No se encontró la canción'),
    });
  }



  add(song: SongRequest, despues?: () => void) {
    this.http.post<Song>(this.url, song).subscribe({
      next: () => {
        this.refrescar();
        despues?.();
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo agregar la canción')),
    });
  }


  update(id: number, cambios: SongUpdateRequest) {
    this.http.patch<Song>(`${this.url}/${id}`, cambios).subscribe({
      next: () => {
        this.songEditando.set(null);
        this.refrescar();
        if (this.song()?.id === id) this.getSong(id);
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo actualizar la canción')),
    });
  }


  updateStatus(id: number, status: Status) {
    this.http.patch<Song>(`${this.url}/${id}/status`, null, { params: { status } }).subscribe({
      next: () => {
        this.refrescar();
        if (this.song()?.id === id) this.getSong(id);
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo cambiar el estado')),
    });
  }


  remove(id: number, despues?: () => void) {
    this.http.delete<void>(`${this.url}/${id}`).subscribe({
      next: () => {
        if (this.song()?.id === id) this.song.set(null);
        this.refrescar();
        despues?.();
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo eliminar la canción')),
    });
  }


  refrescar() {
    if (this.ultimaLista.tipo === 'estado') {
      return this.listByStatus(this.ultimaLista.status!);
    }
    return this.listSongs(this.ultimaLista.filtros);
  }


  mensajeError(err: unknown, porDefecto: string): string {
    const httpError = err as HttpErrorResponse;
    return httpError?.error?.message ?? porDefecto;
  }


  private aParams(filtros: SongFilters): Record<string, string | number> {
    return Object.fromEntries(
      Object.entries(filtros).filter(([, v]) => v !== '' && v != null),
    ) as Record<string, string | number>;
  }


  private cargar(peticion: Observable<Song[]>) {
    this.error.set('');
    this.cargando.set(true);
    peticion.subscribe({
      next: (data) => {
        this.songs.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las canciones');
        this.cargando.set(false);
      },
    });
  }
}
