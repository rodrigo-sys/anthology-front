import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Album } from '../../interfaces/Album';
import { AlbumService } from '../../service/album-service';

@Component({
  selector: 'app-album-list',
  imports: [FormsModule],
  templateUrl: './album-list.html',
})
export class AlbumList implements OnInit {
  albumService = inject(AlbumService)

  searchId: number = 0

  ngOnInit(): void {
    this.albumService.listAlbums()
  }

  buscar(): void {
    this.albumService.getById(this.searchId)
  }

  editar(album: Album): void {
    this.albumService.albumSeleccionado.set(album)
  }

  eliminar(id: number): void {
    this.albumService.remove(id)
  }
}
