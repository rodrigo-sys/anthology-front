import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../interfaces/Enums';
import { Album, AlbumRequest, AlbumUpdateRequest } from '../interfaces/Album';


@Service()
export class AlbumService {
  private http = inject(HttpClient);
  private readonly url = '/api/albums';

  albums = signal<Album[]>([]);
  album = signal<Album | null>(null);
  albumEditando = signal<Album | null>(null);
  error = signal('');
  cargando = signal(false);

  private ultimaLista: {
    tipo: 'todas' | 'estado';
    status?: Status;
  } = { tipo: 'todas' };


  listAlbums() {
    this.ultimaLista = { tipo: 'todas' };
    this.cargar(this.http.get<Album[]>(this.url));
  }

  listByStatus(status: Status) {
    this.ultimaLista = { tipo: 'estado', status };
    this.cargar(this.http.get<Album[]>(`${this.url}/status`, { params: { status } }));
  }


  getAlbum(id: number) {
    if (this.album()?.id !== id) this.album.set(null);
    this.error.set('');
    this.http.get<Album>(`${this.url}/${id}`).subscribe({
      next: (data) => this.album.set(data),
      error: () => this.error.set('No se encontró el álbum'),
    });
  }


  add(album: AlbumRequest, despues?: () => void) {
    this.http.post<Album>(this.url, album).subscribe({
      next: () => {
        this.refrescar();
        despues?.();
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo agregar el álbum')),
    });
  }


  update(id: number, cambios: AlbumUpdateRequest) {
    this.http.patch<Album>(`${this.url}/${id}`, cambios).subscribe({
      next: () => {
        this.albumEditando.set(null);
        this.refrescar();
        if (this.album()?.id === id) this.getAlbum(id);
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo actualizar el álbum')),
    });
  }


  updateStatus(id: number, status: Status) {
    this.http.patch<Album>(`${this.url}/${id}/status`, null, { params: { status } }).subscribe({
      next: () => {
        this.refrescar();
        if (this.album()?.id === id) this.getAlbum(id);
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo cambiar el estado')),
    });
  }


  remove(id: number, despues?: () => void) {
    this.http.delete<void>(`${this.url}/${id}`).subscribe({
      next: () => {
        if (this.album()?.id === id) this.album.set(null);
        this.refrescar();
        despues?.();
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo eliminar el álbum')),
    });
  }


  refrescar() {
    if (this.ultimaLista.tipo === 'estado') {
      return this.listByStatus(this.ultimaLista.status!);
    }
    return this.listAlbums();
  }


  mensajeError(err: unknown, porDefecto: string): string {
    const httpError = err as HttpErrorResponse;
    return httpError?.error?.message ?? porDefecto;
  }


  private cargar(peticion: Observable<Album[]>) {
    this.error.set('');
    this.cargando.set(true);
    peticion.subscribe({
      next: (data) => {
        this.albums.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los álbumes');
        this.cargando.set(false);
      },
    });
  }
}
