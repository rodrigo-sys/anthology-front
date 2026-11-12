import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlaylistService } from '../../service/playlist-service';

@Component({
  selector: 'app-playlist-list',
  imports: [RouterLink],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css'
})
export class PlaylistList {
  playlistService = inject(PlaylistService);
}
