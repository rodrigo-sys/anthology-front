import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Album } from '../../interfaces/Album';
import { STATUS_LABEL, Status } from '../../interfaces/Enums';
import { AlbumService } from '../../service/album-service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-album-list',
  imports: [FormsModule],
  templateUrl: './album-list.html',
})
export class AlbumList implements OnInit {
  albumService = inject(AlbumService)
  authService = inject(AuthService)

  esAdmin = this.authService.isAdmin()

  estados: Status[] = ['PENDING', 'APPROVED', 'REJECTED']
  estadoEtiquetas = STATUS_LABEL

  filtros = {
    title: '',
    artistName: '',
    status: '' as Status | '',
  }

  searchId: number | null = null
  mostrandoMias = false

  ngOnInit(): void {
    this.albumService.listAlbums()
  }

  albumsFiltrados(): Album[] {
    const title = this.filtros.title.trim().toLowerCase()
    const artistName = this.filtros.artistName.trim().toLowerCase()
    const status = this.filtros.status

    return this.albumService.albums().filter((album) => {
      if (title && !album.title.toLowerCase().includes(title)) return false
      if (artistName && !album.artistName.toLowerCase().includes(artistName)) return false
      if (status && album.status !== status) return false
      return true
    })
  }

  buscar(): void {
    if (!this.searchId || this.searchId <= 0) return

    this.albumService.getById(this.searchId)
  }

  limpiar(): void {
    this.filtros = { title: '', artistName: '', status: '' }
    this.searchId = null
    this.mostrandoMias = false
    this.albumService.listAlbums()
  }

  verTodos(): void {
    this.mostrandoMias = false
    this.albumService.listAlbums()
  }

  verMios(): void {
    this.mostrandoMias = true
    this.albumService.myAlbums()
  }

  editar(album: Album): void {
    this.albumService.albumSeleccionado.set(album)
  }

  eliminar(album: Album): void {
    if (!confirm(`¿Eliminar el álbum "${album.title}"? Si tiene canciones, la operación puede fallar.`)) return

    this.albumService.remove(album.id)
  }
}
