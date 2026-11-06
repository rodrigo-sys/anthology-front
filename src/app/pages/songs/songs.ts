import { Component, inject } from '@angular/core';
import { SongCreate } from '../../components/song-create/song-create';
import { SongEdit } from '../../components/song-edit/song-edit';
import { SongList } from '../../components/song-list/song-list';
import { SongService } from '../../service/song-service';

@Component({
  imports: [SongCreate, SongEdit, SongList],
  selector: 'app-songs',
  styleUrl: './songs.css',
  templateUrl: './songs.html',
})
export class Songs {
  songService = inject(SongService)
}
