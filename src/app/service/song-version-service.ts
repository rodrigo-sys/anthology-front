import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Instrument, Status } from '../interfaces/Enums';
import { SongVersion } from '../interfaces/SongVersion';

@Service()
export class SongVersionService {
  http = inject(HttpClient)
  url = (songId: number) => `/api/songs/${songId}/versions`

  versions = signal<SongVersion[]>([])
  versionById = signal<SongVersion | null>(null)
  error = signal<string>('')

  private todas = false

  listVersions(songId: number) {
    this.todas = false

    this.http.get<SongVersion[]>(this.url(songId)).subscribe({
      next: (data) => {
        this.versions.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las versiones')
    })
  }

  listTodas(songId: number) {
    this.todas = true

    this.http.get<SongVersion[]>(`${this.url(songId)}/all`).subscribe({
      next: (data) => {
        this.versions.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las versiones')
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
    const cuerpo = new FormData()
    cuerpo.append('file', file)

    this.http.post<SongVersion>(this.url(songId), cuerpo, { params: { instrument } }).subscribe({
      next: () => {
        this.recargar(songId)
        alSubir?.()
      },
      error: () => this.error.set('No se pudo subir la versión')
    })
  }

  updateStatus(songId: number, versionId: number, status: Status) {
    this.http.patch<SongVersion>(`${this.url(songId)}/${versionId}/status`, null, { params: { status } }).subscribe({
      next: () => this.recargar(songId),
      error: () => this.error.set('No se pudo cambiar el estado')
    })
  }

  remove(songId: number, versionId: number) {
    this.http.delete<void>(`${this.url(songId)}/${versionId}`).subscribe({
      next: () => this.recargar(songId),
      error: () => this.error.set('No se pudo eliminar la versión')
    })
  }

  private recargar(songId: number) {
    if (this.todas) this.listTodas(songId)
    else this.listVersions(songId)
  }
}
