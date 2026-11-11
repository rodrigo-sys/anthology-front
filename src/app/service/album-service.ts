import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Status } from '../interfaces/Enums';
import { Album, AlbumRequest, AlbumUpdateRequest } from '../interfaces/Album';

@Service()
export class AlbumService {
  http = inject(HttpClient)
  url = '/api/albums'

  albums = signal<Album[]>([])
  albumById = signal<Album | null>(null)
  albumSeleccionado = signal<Album | null>(null)
  error = signal<string>('')

  listAlbums() {
    this.http.get<Album[]>(this.url).subscribe({
      next: (data) => {
        this.albums.set(data)
        this.albumById.set(null)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar los álbumes')
    })
  }

  getById(id: number) {
    this.albumById.set(null)

    this.http.get<Album>(`${this.url}/${id}`).subscribe({
      next: (data) => {
        this.albumById.set(data)
        this.error.set('')
      },
      error: () => {
        this.albumById.set(null)
        this.error.set('No se encontró este álbum')
      }
    })
  }

  add(album: AlbumRequest, alCrear?: (album: Album) => void) {
    this.http.post<Album>(this.url, album).subscribe({
      next: (data) => {
        this.error.set('')
        this.listAlbums()
        alCrear?.(data)
      },
      error: () => this.error.set('No se pudo agregar el álbum')
    })
  }

  update(id: number, cambios: AlbumUpdateRequest) {
    this.http.patch<Album>(`${this.url}/${id}`, cambios).subscribe({
      next: () => {
        this.albumSeleccionado.set(null)
        this.listAlbums()
      },
      error: () => this.error.set('No se pudo actualizar el álbum')
    })
  }

  updateStatus(id: number, status: Status) {
    this.http.patch<Album>(`${this.url}/${id}/status`, null, { params: { status } }).subscribe({
      next: () => this.listAlbums(),
      error: () => this.error.set('No se pudo cambiar el estado')
    })
  }

  remove(id: number) {
    this.http.delete<void>(`${this.url}/${id}`).subscribe({
      next: () => this.listAlbums(),
      error: () => this.error.set('No se pudo eliminar el álbum')
    })
  }
}
