import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Status } from '../interfaces/Enums';
import { Album, AlbumRequest, AlbumUpdateRequest } from '../interfaces/Album';
import { AuthService } from './auth-service';

@Service()
export class AlbumService {
  http = inject(HttpClient)
  authService = inject(AuthService)
  url = '/api/albums'

  albums = signal<Album[]>([])
  albumById = signal<Album | null>(null)
  albumSeleccionado = signal<Album | null>(null)
  error = signal<string>('')

  private estado: Status | null = null
  private mis = false

  listAlbums() {
    this.estado = null
    this.mis = false

    this.http.get<Album[]>(this.url).subscribe({
      next: (data) => {
        this.albums.set(data)
        this.albumById.set(null)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar los álbumes')
    })
  }

  listByStatus(status: Status) {
    if (!this.soloAdmin('filtrar álbumes por estado')) return

    this.estado = status
    this.mis = false

    this.http.get<Album[]>(`${this.url}/status`, { params: { status } }).subscribe({
      next: (data) => {
        this.albums.set(data)
        this.albumById.set(null)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar los álbumes')
    })
  }

  myAlbums() {
    this.mis = true
    this.estado = null

    this.http.get<Album[]>(`${this.url}/my-albums`).subscribe({
      next: (data) => {
        this.albums.set(data)
        this.albumById.set(null)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar tus álbumes')
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
    this.http.post<Album>(this.authService.isAdmin() ? this.url : `${this.url}/artist`, album).subscribe({
      next: (data) => {
        this.error.set('')
        this.recargar()
        alCrear?.(data)
      },
      error: () => this.error.set('No se pudo agregar el álbum')
    })
  }

  update(id: number, cambios: AlbumUpdateRequest) {
    this.http.patch<Album>(
      this.authService.isAdmin() ? `${this.url}/${id}` : `${this.url}/artist/${id}`,
      cambios
    ).subscribe({
      next: () => {
        this.albumSeleccionado.set(null)
        this.recargar()
      },
      error: () => this.error.set('No se pudo actualizar el álbum')
    })
  }

  updateStatus(id: number, status: Status) {
    if (!this.soloAdmin('cambiar el estado de un álbum')) return

    this.http.patch<Album>(`${this.url}/${id}/status`, null, { params: { status } }).subscribe({
      next: () => this.recargar(),
      error: () => this.error.set('No se pudo cambiar el estado')
    })
  }

  remove(id: number) {
    this.http.delete<void>(
      this.authService.isAdmin() ? `${this.url}/${id}` : `${this.url}/artist/${id}`
    ).subscribe({
      next: () => this.recargar(),
      error: () => this.error.set('No se pudo eliminar el álbum')
    })
  }

  private recargar() {
    if (this.estado) this.listByStatus(this.estado)
    else if (this.mis) this.myAlbums()
    else this.listAlbums()
  }

  private soloAdmin(accion: string) {
    if (this.authService.isAdmin()) return true

    this.error.set(`Solo un administrador puede ${accion}`)
    return false
  }
}
