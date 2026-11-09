import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongSuggestionRequest, SongSuggestionResponse } from '../interfaces/Suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private http = inject(HttpClient);
  private url = '/api/songsSuggestions';

  suggestions = signal<SongSuggestionResponse[]>([]);
  suggestionById = signal<SongSuggestionResponse | null>(null);
  error = signal<string>('');

  listSuggestions() {
    this.http.get<SongSuggestionResponse[]>(this.url).subscribe({
      next: (data) => {
        this.suggestions.set(data);
        this.error.set('');
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403 || err.status === 500) {
          this.error.set('No tienes permisos para ver esta sección');
        } else {
          this.error.set('No se pudieron cargar las sugerencias');
        }
      }
    });
  }

  getById(id: number) {
    this.http.get<SongSuggestionResponse>(`${this.url}/${id}`).subscribe({
      next: (data) => {
        this.suggestionById.set(data);
        this.error.set('');
      },
      error: () => {
        this.suggestionById.set(null);
        this.error.set('No se encontró la sugerencia');
      }
    });
  }

  create(request: SongSuggestionRequest) {
    this.http.post<SongSuggestionResponse>(this.url, request).subscribe({
      next: () => {
        this.error.set('');
      },
      error: () => this.error.set('No se pudo crear la sugerencia')
    });
  }

  reject(id: number) {
    this.http.patch<SongSuggestionResponse>(`${this.url}/${id}`, {}).subscribe({
      next: () => this.listSuggestions(),
      error: () => this.error.set('No se pudo rechazar la sugerencia')
    });
  }

  addSuggestion(id: number) {
    this.http.patch<SongSuggestionResponse>(`${this.url}/${id}/add`, {}).subscribe({
      next: () => this.listSuggestions(),
      error: () => this.error.set('No se pudo aprobar la sugerencia')
    });
  }

  remove(id: number) {
    this.http.delete<void>(`${this.url}/${id}`).subscribe({
      next: () => this.listSuggestions(),
      error: () => this.error.set('No se pudo eliminar la sugerencia')
    });
  }
}
