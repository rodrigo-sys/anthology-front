import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Instrument, Status } from '../interfaces/Enums';
import { Song, SongFilters, SongRequest, SongUpdateRequest } from '../interfaces/Song';
import { AuthService } from './auth-service';

@Service()
export class SongService {
  http = inject(HttpClient)
  authService = inject(AuthService)
  url = '/api/songs'

  songs = signal<Song[]>([])
  songById = signal<Song | null>(null)
  songSeleccionada = signal<Song | null>(null)
  instrumento = signal<Instrument | ''>('')
  error = signal<string>('')

  songsFiltradas = computed(() => {
    const instrumento = this.instrumento()
    if (!instrumento) return this.songs()
    return this.songs().filter((song) => song.availableInstruments.includes(instrumento))
  })

  private filtros: SongFilters = {}
  private estado: Status | null = null
  private todas = false
  private mis = false

  listSongs(filtros: SongFilters = {}) {
    this.filtros = filtros
    this.estado = null
    this.todas = false
    this.mis = false

    this.http.get<Song[]>(this.url, { params: this.params(filtros) }).subscribe({
      next: (data) => {
        this.songs.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las canciones')
    })
  }

  listTodas() {
    if (!this.soloAdmin('ver todas las canciones')) return

    this.todas = true
    this.estado = null
    this.mis = false

    this.http.get<Song[]>(`${this.url}/all`).subscribe({
      next: (data) => {
        this.songs.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las canciones')
    })
  }

  listByStatus(status: Status) {
    if (!this.soloAdmin('filtrar canciones por estado')) return

    this.estado = status
    this.todas = false
    this.mis = false

    this.http.get<Song[]>(`${this.url}/status`, { params: { status } }).subscribe({
      next: (data) => {
        this.songs.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las canciones')
    })
  }

  listByInstrument(instrument: Instrument) {
    this.estado = null
    this.todas = false
    this.mis = false

    this.http.get<Song[]>(`${this.url}/by-instrument`, { params: { instrument } }).subscribe({
      next: (data) => {
        this.songs.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar las canciones')
    })
  }

  mySongs() {
    this.mis = true
    this.todas = false
    this.estado = null

    this.http.get<Song[]>(`${this.url}/my-songs`).subscribe({
      next: (data) => {
        this.songs.set(data)
        this.error.set('')
      },
      error: () => this.error.set('No se pudieron cargar tus canciones')
    })
  }

  getById(id: number) {
    this.songById.set(null)

    this.http.get<Song>(`${this.url}/${id}`).subscribe({
      next: (data) => {
        this.songById.set(data)
        this.error.set('')
      },
      error: () => {
        this.songById.set(null)
        this.error.set('No se encontró esta canción')
      }
    })
  }

  add(song: SongRequest, alCrear?: () => void) {
    this.http.post<Song>(this.authService.isAdmin() ? this.url : `${this.url}/artist`, song).subscribe({
      next: () => {
        this.recargar()
        alCrear?.()
      },
      error: () => this.error.set('No se pudo agregar la canción')
    })
  }

  update(id: number, cambios: SongUpdateRequest) {
    this.http.patch<Song>(
      this.authService.isAdmin() ? `${this.url}/${id}` : `${this.url}/artist/${id}`,
      cambios
    ).subscribe({
      next: () => {
        this.songSeleccionada.set(null)
        this.recargar()
      },
      error: () => this.error.set('No se pudo actualizar la canción')
    })
  }

  updateStatus(id: number, status: Status) {
    if (!this.soloAdmin('cambiar el estado de una canción')) return

    this.http.patch<Song>(`${this.url}/${id}/status`, null, { params: { status } }).subscribe({
      next: () => this.recargar(),
      error: () => this.error.set('No se pudo cambiar el estado')
    })
  }

  remove(id: number) {
    this.http.delete<void>(
      this.authService.isAdmin() ? `${this.url}/${id}` : `${this.url}/artist/${id}`
    ).subscribe({
      next: () => this.recargar(),
      error: () => this.error.set('No se pudo eliminar la canción')
    })
  }

  private recargar() {
    if (this.todas) this.listTodas()
    else if (this.estado) this.listByStatus(this.estado)
    else if (this.mis) this.mySongs()
    else this.listSongs(this.filtros)
  }

  private soloAdmin(accion: string) {
    if (this.authService.isAdmin()) return true

    this.error.set(`Solo un administrador puede ${accion}`)
    return false
  }

  private params(filtros: SongFilters) {
    const params: Record<string, string | number> = {}

    const title = filtros.title?.trim()
    const genre = filtros.genre?.trim()
    const artistName = filtros.artistName?.trim()

    if (title) params['title'] = title
    if (genre) params['genre'] = genre
    if (artistName) params['artistName'] = artistName
    if (filtros.albumId) params['albumId'] = filtros.albumId

    return params
  }
}
