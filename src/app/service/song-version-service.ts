import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../interfaces/Enums';
import { SongVersion, SongVersionRequest } from '../interfaces/SongVersion';


@Service()
export class SongVersionService {
  private http = inject(HttpClient);
  private readonly url = (songId: number) => `/api/songs/${songId}/versions`;

  versions = signal<SongVersion[]>([]);
  version = signal<SongVersion | null>(null);
  error = signal('');
  cargando = signal(false);

  private cancionListada: number | null = null;

  private ultimaLista: {
    songId: number;
    tipo: 'aprobadas' | 'todas';
  } | null = null;


  listVersions(songId: number) {
    this.ultimaLista = { songId, tipo: 'aprobadas' };
    this.cargar(this.http.get<SongVersion[]>(this.url(songId)), songId);
  }

  listTodas(songId: number) {
    this.ultimaLista = { songId, tipo: 'todas' };
    this.cargar(this.http.get<SongVersion[]>(`${this.url(songId)}/all`), songId);
  }


  getVersion(songId: number, versionId: number) {
    if (this.version()?.id !== versionId) this.version.set(null);
    this.error.set('');
    this.http.get<SongVersion>(`${this.url(songId)}/${versionId}`).subscribe({
      next: (data) => this.version.set(data),
      error: () => this.error.set('No se encontró la versión'),
    });
  }


  add(songId: number, version: SongVersionRequest, despues?: () => void) {
    const cuerpo = new FormData();
    cuerpo.append('file', version.file);

    this.http
      .post<SongVersion>(this.url(songId), cuerpo, { params: { instrument: version.instrument } })
      .subscribe({
        next: () => {
          this.refrescar();
          despues?.();
        },
        error: (err) => this.error.set(this.mensajeError(err, 'No se pudo subir la versión')),
      });
  }


  updateStatus(songId: number, versionId: number, status: Status) {
    this.http
      .patch<SongVersion>(`${this.url(songId)}/${versionId}/status`, null, { params: { status } })
      .subscribe({
        next: () => {
          this.refrescar();
          if (this.version()?.id === versionId) this.getVersion(songId, versionId);
        },
        error: (err) => this.error.set(this.mensajeError(err, 'No se pudo cambiar el estado')),
      });
  }


  remove(songId: number, versionId: number, despues?: () => void) {
    this.http.delete<void>(`${this.url(songId)}/${versionId}`).subscribe({
      next: () => {
        if (this.version()?.id === versionId) this.version.set(null);
        this.refrescar();
        despues?.();
      },
      error: (err) => this.error.set(this.mensajeError(err, 'No se pudo eliminar la versión')),
    });
  }


  refrescar() {
    if (!this.ultimaLista) return;
    if (this.ultimaLista.tipo === 'todas') {
      return this.listTodas(this.ultimaLista.songId);
    }
    return this.listVersions(this.ultimaLista.songId);
  }


  mensajeError(err: unknown, porDefecto: string): string {
    const httpError = err as HttpErrorResponse;
    return httpError?.error?.message ?? porDefecto;
  }


  private cargar(peticion: Observable<SongVersion[]>, songId: number) {
    if (this.cancionListada !== songId) this.versions.set([]);

    this.error.set('');
    this.cargando.set(true);
    peticion.subscribe({
      next: (data) => {
        this.versions.set(data);
        this.cancionListada = songId;
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las versiones');
        this.cargando.set(false);
      },
    });
  }
}
