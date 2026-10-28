import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlaylistRequest {
  name: string;
  idUser: number;
}
export interface PlaylistResponse {
  id: number;
  idUser: number;
  name: string;
  isDefault: boolean;
  createdAt: string;
  songVersions: any[];
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

  createPlaylist(request: PlaylistRequest): Observable<PlaylistResponse> {
    return this.http.post<PlaylistResponse>(this.url, request);
  }

  getPlaylistsByUser(userId: number): Observable<PlaylistResponse[]> {
    return this.http.get<PlaylistResponse[]>(`${this.url}/${userId}/user`);
  }

  getPlaylistById(id: number): Observable<PlaylistResponse> {
    return this.http.get<PlaylistResponse>(`${this.url}/${id}`);
  }

  deletePlaylist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updatePlaylist(id: number, request: PlaylistUpdateRequest): Observable<PlaylistResponse> {
    return this.http.patch<PlaylistResponse>(`${this.url}/${id}`, request);
  }

  addSongVersion(playlistId: number, songVersionId: number): Observable<PlaylistResponse> {
    return this.http.patch<PlaylistResponse>(`${this.url}/${playlistId}/canciones/${songVersionId}`, {});
  }

  removeSongVersion(playlistId: number, songVersionId: number): Observable<PlaylistResponse> {
    return this.http.delete<PlaylistResponse>(`${this.url}/${playlistId}/canciones/${songVersionId}`);
  }
}
