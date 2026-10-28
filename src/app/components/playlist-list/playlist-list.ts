import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlaylistResponse } from '../../service/playlist-service';

@Component({
  selector: 'app-playlist-list',
  imports: [RouterLink],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css'
})
export class PlaylistList {
  playlists = input<PlaylistResponse[]>([]);
}
