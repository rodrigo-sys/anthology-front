import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INSTRUMENTS, INSTRUMENT_LABEL, Status } from '../../interfaces/Enums';
import { Song, SongFilters } from '../../interfaces/Song';
import { SongService } from '../../service/song-service';

@Component({
  selector: 'app-song-list',
  imports: [FormsModule],
  templateUrl: './song-list.html',
})
export class SongList implements OnInit {
  songService = inject(SongService)

  instrumentos = INSTRUMENTS
  etiquetas = INSTRUMENT_LABEL
  estados: Status[] = ['PENDING', 'APPROVED', 'REJECTED']

  filtros: SongFilters = {}
  estado: Status | '' = ''

  ngOnInit(): void {
    this.songService.listSongs()
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

  eliminar(id: number): void {
    this.songService.remove(id)
  }
}
