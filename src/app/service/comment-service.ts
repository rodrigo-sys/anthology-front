import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentRequest, CommentResponse } from '../interfaces/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private url = '/api/comments';

  comments = signal<CommentResponse[]>([]);
  commentById = signal<CommentResponse | null>(null);
  error = signal<string>('');

  listComments() {
    this.http.get<CommentResponse[]>(this.url).subscribe({
      next: (data) => {
        this.comments.set(data);
        this.error.set('');
      },
      error: () => this.error.set('No se pudieron cargar los comentarios')
    });
  }

  getBySongVersionId(songVersionId: number) {
    this.http.get<CommentResponse[]>(`${this.url}/song-version/${songVersionId}`).subscribe({
      next: (data) => {
        this.comments.set(data);
        this.error.set('');
      },
      error: () => this.error.set('No se pudieron cargar los comentarios de la versión')
    });
  }

  getById(id: number) {
    this.http.get<CommentResponse>(`${this.url}/${id}`).subscribe({
      next: (data) => {
        this.commentById.set(data);
        this.error.set('');
      },
      error: () => {
        this.commentById.set(null);
        this.error.set('No se encontró el comentario');
      }
    });
  }

  add(request: CommentRequest, songVersionId?: number) {
    this.http.post<CommentResponse>(this.url, request).subscribe({
      next: () => {
        if (songVersionId) {
          this.getBySongVersionId(songVersionId);
        } else {
          this.listComments();
        }
      },
      error: () => this.error.set('No se pudo crear el comentario')
    });
  }

  remove(id: number, songVersionId?: number) {
    this.http.delete<void>(`${this.url}/${id}`).subscribe({
      next: () => {
        if (songVersionId) {
          this.getBySongVersionId(songVersionId);
        } else {
          this.listComments();
        }
      },
      error: () => this.error.set('No se pudo eliminar el comentario')
    });
  }
}
