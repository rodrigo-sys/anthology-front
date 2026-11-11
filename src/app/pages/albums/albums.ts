import { Component, inject } from '@angular/core';
import { AlbumCreate } from '../../components/albums/album-create/album-create';
import { AlbumEdit } from '../../components/albums/album-edit/album-edit';
import { AlbumList } from '../../components/albums/album-list/album-list';
import { AlbumService } from '../../service/album-service';

@Component({
  imports: [AlbumCreate, AlbumEdit, AlbumList],
  selector: 'app-albums',
  templateUrl: './albums.html',
})
export class Albums {
  albumService = inject(AlbumService)
}
