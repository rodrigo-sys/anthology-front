import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PlaylistRequest {
  name: string;
  idUser: number;
}

export interface SongVersionResponse {
  id: number;
  songId: number;
  songTitle: string;
  instrument: 'GUITAR' | 'BASS' | 'PIANO';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  pdfUrl: string;
}

export interface PlaylistResponse {
  id: number;
  idUser: number;
  name: string;
  isDefault: boolean;
  createdAt: string;
  songVersions: SongVersionResponse[];
}
export interface PlaylistUpdateRequest {
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3001';
  private url = `${this.baseUrl}/api/playlists`;

  playlists = signal<PlaylistResponse[]>([]);
  playlistById = signal<PlaylistResponse | null>(null);
  error = signal<string>('');

  getPlaylistsByUser(userId: number) {
    this.http.get<PlaylistResponse[]>(`${this.url}/${userId}/user`).subscribe({
      next: (data) => {
        this.playlists.set(data);
        this.error.set('');
      },
      error: () => this.error.set('No se pudieron cargar las playlists')
    });
  }

  getPlaylistById(id: number) {
    this.http.get<PlaylistResponse>(`${this.url}/${id}`).subscribe({
      next: (data) => {
        this.playlistById.set(data);
        this.error.set('');
      },
      error: () => {
        this.playlistById.set(null);
        this.error.set('No se encontró la playlist');
      }
    });
  }

  createPlaylist(request: PlaylistRequest) {
    this.http.post<PlaylistResponse>(this.url, request).subscribe({
      next: () => this.getPlaylistsByUser(request.idUser),
      error: () => this.error.set('No se pudo crear la playlist')
    });
  }

  deletePlaylist(id: number, userId: number = 1) {
    this.http.delete<void>(`${this.url}/${id}`).subscribe({
      next: () => this.getPlaylistsByUser(userId),
      error: () => this.error.set('No se pudo eliminar la playlist')
    });
  }

  updatePlaylist(id: number, request: PlaylistUpdateRequest, userId: number = 1) {
    this.http.patch<PlaylistResponse>(`${this.url}/${id}`, request).subscribe({
      next: () => this.getPlaylistsByUser(userId),
      error: () => this.error.set('No se pudo actualizar la playlist')
    });
  }

  addSongVersion(playlistId: number, songVersionId: number) {
    this.http.patch<PlaylistResponse>(`${this.url}/${playlistId}/canciones/${songVersionId}`, {}).subscribe({
      next: (updated) => {
        this.playlistById.set(updated);
      },
      error: () => this.error.set('No se pudo agregar la canción')
    });
  }

  removeSongVersion(playlistId: number, songVersionId: number) {
    this.http.delete<PlaylistResponse>(`${this.url}/${playlistId}/canciones/${songVersionId}`).subscribe({
      next: (updated) => {
        this.playlistById.set(updated);
      },
      error: () => this.error.set('No se pudo quitar la canción')
    });
  }
}
