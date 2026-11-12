import { Component, inject } from '@angular/core';
import { SongCreate } from '../../components/songs/song-create/song-create';
import { SongEdit } from '../../components/songs/song-edit/song-edit';
import { SongList } from '../../components/songs/song-list/song-list';
import { SongService } from '../../service/song-service';

@Component({
  imports: [SongCreate, SongEdit, SongList],
  selector: 'app-songs',
  templateUrl: './songs.html',
  styleUrl: './songs.css'
})
export class Songs {
  songService = inject(SongService)
}
