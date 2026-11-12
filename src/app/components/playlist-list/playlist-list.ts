import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlaylistService } from '../../service/playlist-service';
import { AuthService } from '../../service/auth-service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playlist-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css'
})
export class PlaylistList {
  playlistService = inject(PlaylistService);
  authService = inject(AuthService);

  editingId: number | null = null;
  newName = '';

  startEdit(playlist: any) {
    this.editingId = playlist.id;
    this.newName = playlist.name;
  }

  saveEdit(playlist: any) {
    if (!this.newName.trim()) return;
    const userId = this.authService.getUserId() || playlist.idUser;
    this.playlistService.updatePlaylist(playlist.id, { name: this.newName, idUser: userId }, userId);
    this.editingId = null;
  }

  deletePlaylist(playlist: any) {
    const userId = this.authService.getUserId() || playlist.idUser;
    this.playlistService.deletePlaylist(playlist.id, userId);
  }
}
