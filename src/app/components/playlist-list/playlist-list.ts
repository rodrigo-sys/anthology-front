import { Component, Input } from '@angular/core';
import { PlaylistResponse } from '../../service/playlist-service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css'
})
export class PlaylistList {
  @Input() playlists: PlaylistResponse[] = [];
}
