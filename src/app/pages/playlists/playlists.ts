import { Component, inject, OnInit, signal } from '@angular/core';
import { PlaylistService, PlaylistResponse } from '../../service/playlist-service';
import { PlaylistList } from '../../components/playlist-list/playlist-list';
import { PlaylistCreate } from '../../components/playlist-create/playlist-create';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistList, PlaylistCreate],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css'
})
export class Playlists implements OnInit {
  private playlistService = inject(PlaylistService);

  // todo: usar id de usuario logueado
  userId = 1;
  playlists = signal<PlaylistResponse[]>([]);

  ngOnInit() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    this.playlistService.getPlaylistsByUser(this.userId).subscribe(playlists => {
      this.playlists.set(playlists);
    });
  }
}
