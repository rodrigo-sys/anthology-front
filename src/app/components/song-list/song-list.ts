import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { INSTRUMENTS, INSTRUMENT_LABEL, STATUS_LABEL, Status } from '../../interfaces/Enums';
import { Song, SongFilters } from '../../interfaces/Song';
import { AlbumService } from '../../service/album-service';
import { SongService } from '../../service/song-service';

@Component({
  selector: 'app-song-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './song-list.html',
})
export class SongList implements OnInit {
  songService = inject(SongService)
  albumService = inject(AlbumService)

  instrumentos = INSTRUMENTS
  etiquetas = INSTRUMENT_LABEL
  estadoEtiquetas = STATUS_LABEL
  estados: Status[] = ['PENDING', 'APPROVED', 'REJECTED']

  filtros: SongFilters = {}
  estado: Status | '' = ''

  ngOnInit(): void {
    this.songService.listSongs()
    this.albumService.listAlbums()
  }

  buscar(): void {
    if (this.estado) this.songService.listByStatus(this.estado)
    else this.songService.listSongs(this.filtros)
  }

  limpiar(): void {
    this.filtros = {}
    this.estado = ''
    this.songService.instrumento.set('')
    this.songService.listSongs()
  }

  editar(song: Song): void {
    this.songService.songSeleccionada.set(song)
  }

  eliminar(song: Song): void {
    if (!confirm(`¿Eliminar la canción "${song.title}"?`)) return

    this.songService.remove(song.id)
  }

  instrumentosDe(song: Song): string {
    return song.availableInstruments.map((instrumento) => this.etiquetas[instrumento]).join(', ')
  }
}
