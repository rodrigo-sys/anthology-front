import { Component, inject, OnInit } from '@angular/core';
import { PlaylistService } from '../../service/playlist-service';
import { AuthService } from '../../service/auth-service';
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
  private authService = inject(AuthService);

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.playlistService.getPlaylistsByUser(userId);
    }
  }
}
