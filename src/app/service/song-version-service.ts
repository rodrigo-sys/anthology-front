import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Instrument, Status } from '../interfaces/Enums';
import { SongVersion } from '../interfaces/SongVersion';
import { AuthService } from './auth-service';

@Service()
export class SongVersionService {
  http = inject(HttpClient)
  authService = inject(AuthService)
  url = (songId: number) => `/api/songs/${songId}/versions`

  versions = signal<SongVersion[]>([])
  versionById = signal<SongVersion | null>(null)
  error = signal<string>('')

  private todas = false
  private mis = false
  private estado: Status | null = null

  listVersions(songId: number) {
    this.todas = false
    this.mis = false
    this.estado = null

    this.http.get<SongVersion[]>(this.url(songId)).subscribe({
      next: (data) => {
        this.versions.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las versiones')
    })
  }

  listTodas(songId: number) {
    if (!this.soloAdmin('ver todas las versiones')) return

    this.todas = true
    this.mis = false
    this.estado = null

    this.http.get<SongVersion[]>(`${this.url(songId)}/all`).subscribe({
      next: (data) => {
        this.versions.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las versiones')
    })
  }

  // el backend expone esta ruta anidada dentro de /api/songs/{songId}/versions
  listByStatus(songId: number, status: Status) {
    if (!this.soloAdmin('filtrar versiones por estado')) return

    this.estado = status
    this.todas = false
    this.mis = false

    this.http.get<SongVersion[]>(`${this.url(songId)}/api/versions/status`, { params: { status } }).subscribe({
      next: (data) => {
        this.versions.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las versiones')
    })
  }

  // el backend expone esta ruta anidada dentro de /api/songs/{songId}/versions
  myVersions(songId: number) {
    if (!this.soloArtista('ver tus versiones')) return

    this.mis = true
    this.todas = false
    this.estado = null

    this.http.get<SongVersion[]>(`${this.url(songId)}/api/artist/my-versions`).subscribe({
      next: (data) => {
        this.versions.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar tus versiones')
    })
  }

  listDeleted(songId: number) {
    if (!this.soloAdmin('ver las versiones eliminadas')) return

    this.estado = null
    this.todas = false
    this.mis = false

    this.http.get<SongVersion[]>(`${this.url(songId)}/deleted`).subscribe({
      next: (data) => {
        this.versions.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las versiones eliminadas')
    })
  }

  getById(songId: number, versionId: number) {
    this.http.get<SongVersion>(`${this.url(songId)}/${versionId}`).subscribe({
      next: (data) => {
        this.versionById.set(data)
        this.error.set('')
      },
      error: () => {
        this.versionById.set(null)
        this.error.set('No se encontró esta versión')
      }
    })
  }

  add(songId: number, instrument: Instrument, file: File, alSubir?: () => void) {
    if (!this.puedeEscribir('subir versiones')) return

    const cuerpo = new FormData()
    cuerpo.append('file', file)

    this.http.post<SongVersion>(
      this.authService.isAdmin() ? this.url(songId) : `${this.url(songId)}/artist`,
      cuerpo,
      { params: { instrument } }
    ).subscribe({
      next: () => {
        this.recargar(songId)
        alSubir?.()
      },
      error: () => this.error.set('No se pudo subir la versión')
    })
  }

  updateStatus(songId: number, versionId: number, status: Status) {
    if (!this.soloAdmin('cambiar el estado de una versión')) return

    this.http.patch<SongVersion>(`${this.url(songId)}/${versionId}/status`, null, { params: { status } }).subscribe({
      next: () => this.recargar(songId),
      error: () => this.error.set('No se pudo cambiar el estado')
    })
  }

  remove(songId: number, versionId: number) {
    if (!this.puedeEscribir('eliminar versiones')) return

    this.http.delete<void>(
      this.authService.isAdmin()
        ? `${this.url(songId)}/${versionId}`
        : `${this.url(songId)}/artist/${versionId}`
    ).subscribe({
      next: () => this.recargar(songId),
      error: () => this.error.set('No se pudo eliminar la versión')
    })
  }

  private recargar(songId: number) {
    if (this.estado) this.listByStatus(songId, this.estado)
    else if (this.todas) this.listTodas(songId)
    else if (this.mis) this.myVersions(songId)
    else this.listVersions(songId)
  }

  private soloAdmin(accion: string) {
    if (this.authService.isAdmin()) return true

    this.error.set(`Solo un administrador puede ${accion}`)
    return false
  }

  private soloArtista(accion: string) {
    if (this.authService.isArtist()) return true

    this.error.set(`Solo un artista puede ${accion}`)
    return false
  }

  private puedeEscribir(accion: string) {
    if (this.authService.isAdmin() || this.authService.isArtist()) return true

    this.error.set(`Solo un administrador o artista puede ${accion}`)
    return false
  }
}
