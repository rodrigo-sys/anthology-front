import { Component, inject, OnInit } from '@angular/core';
import { PlaylistService } from '../../service/playlist-service';
import { PlaylistList } from '../../components/playlist-list/playlist-list';
import { PlaylistCreate } from '../../components/playlist-create/playlist-create';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistList, PlaylistCreate],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css'
})
export class Playlists implements OnInit {
  playlistService = inject(PlaylistService);

  // todo: usar id de usuario logueado
  userId = 1;

  ngOnInit() {
    this.playlistService.getPlaylistsByUser(this.userId);
  }
}
