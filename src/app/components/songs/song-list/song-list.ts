import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { INSTRUMENTS, INSTRUMENT_LABEL, STATUS_LABEL, Status } from '../../../interfaces/Enums';
import { Song, SongFilters } from '../../../interfaces/Song';
import { AlbumService } from '../../../service/album-service';
import { AuthService } from '../../../service/auth-service';
import { SongService } from '../../../service/song-service';
import { SongVersionService } from '../../../service/song-version-service';

@Component({
  selector: 'app-song-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './song-list.html',
  styleUrl: './song-list.css'
})
export class SongList implements OnInit {
  songService = inject(SongService)
  albumService = inject(AlbumService)
  versionService = inject(SongVersionService)
  authService = inject(AuthService)
  route = inject(ActivatedRoute)

  esAdmin = this.authService.isAdmin()
  esArtist = this.authService.isArtist()

  instrumentos = INSTRUMENTS
  etiquetas = INSTRUMENT_LABEL
  estadoEtiquetas = STATUS_LABEL
  estados: Status[] = ['PENDING', 'APPROVED', 'REJECTED']

  filtros: SongFilters = {}
  estado: Status | '' = ''
  mostrandoMias = false

  ngOnInit(): void {
    this.albumService.listAlbums()

    const estadoParam = this.route.snapshot.queryParamMap.get('estado')
    const estado = this.estados.find((valor) => valor === estadoParam)

    if (this.esAdmin && estado) {
      this.estado = estado
      this.songService.listByStatus(estado)
    } else {
      this.songService.listSongs()
    }
  }

  buscar(): void {
    this.mostrandoMias = false
    if (this.estado) this.songService.listByStatus(this.estado)
    else this.songService.listSongs(this.filtros)
  }

  verTodas(): void {
    this.estado = ''
    this.mostrandoMias = false
    this.songService.listTodas()
  }

  verAprobadas(): void {
    this.estado = ''
    this.mostrandoMias = false
    this.songService.listSongs()
  }

  verMias(): void {
    this.estado = ''
    this.mostrandoMias = true
    this.songService.mySongs()
  }

  limpiar(): void {
    this.filtros = {}
    this.estado = ''
    this.mostrandoMias = false
    this.songService.instrumento.set('')
    this.songService.listSongs()
  }

  editar(song: Song): void {
    this.songService.songSeleccionada.set(song)
  }

  aprobar(song: Song): void {
    this.songService.updateStatus(song.id, 'APPROVED', () => {
      this.versionService.aprobarPendientes(song.id)

      if (song.AlbumTitle) {
        this.albumService.aprobarPorTituloYAnio(song.AlbumTitle, song.ReleaseYear, song.artistName)
      }
    })
  }

  rechazar(song: Song): void {
    this.songService.updateStatus(song.id, 'REJECTED')
  }

  eliminar(song: Song): void {
    if (!confirm(`¿Eliminar la canción "${song.title}"?`)) return

    this.songService.remove(song.id)
  }

  instrumentosDe(song: Song): string {
    return song.availableInstruments.map((instrumento) => this.etiquetas[instrumento]).join(', ')
  }
}
