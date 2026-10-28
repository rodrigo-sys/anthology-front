import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Album } from '../interfaces/Album';

@Service()
export class AlbumService {
  http = inject(HttpClient)
  url = '/api/albums'
  albums = signal<Album[]>([])

  listAlbums() {
    this.http.get<Album[]>(this.url).subscribe({
      next: (data) => { this.albums.set(data)}
    })
  }
}
