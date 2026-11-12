import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaylistService, PlaylistResponse } from '../../service/playlist-service';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-all-playlists-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './all-playlists.html',
  styleUrl: './all-playlists.css'
})
export class AllPlaylistsPage implements OnInit {
  playlistService = inject(PlaylistService);
  private authService = inject(AuthService);

  editingId: number | null = null;
  newName = '';

  ngOnInit() {
    this.playlistService.getAllPlaylists();
  }

  startEdit(playlist: PlaylistResponse) {
    this.editingId = playlist.id;
    this.newName = playlist.name;
  }

  saveEdit(playlist: PlaylistResponse) {
    if (!this.newName.trim()) return;
    const userId = this.authService.getUserId() ?? playlist.idUser;
    this.playlistService.updatePlaylist(playlist.id, { name: this.newName, idUser: playlist.idUser }, userId, true);
    this.editingId = null;
  }

  deletePlaylist(playlist: PlaylistResponse) {
    const userId = this.authService.getUserId() ?? playlist.idUser;
    this.playlistService.deletePlaylist(playlist.id, userId, true);
  }

  nameFilter = signal('');
  userIdFilter = signal('');
  idFilter = signal('');

  filteredPlaylists = computed(() => {
    const name = this.nameFilter().toLowerCase().trim();
    const userId = this.userIdFilter().trim();
    const id = this.idFilter().trim();

    return this.playlistService.allPlaylists().filter(p => {
      if (name && !p.name.toLowerCase().includes(name)) return false;
      if (userId && p.idUser.toString() !== userId) return false;
      if (id && p.id.toString() !== id) return false;
      return true;
    });
  });

  onNameInput(event: Event) {
    this.nameFilter.set((event.target as HTMLInputElement).value);
  }

  onUserIdInput(event: Event) {
    this.userIdFilter.set((event.target as HTMLInputElement).value);
  }

  onIdInput(event: Event) {
    this.idFilter.set((event.target as HTMLInputElement).value);
  }
}
