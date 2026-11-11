import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  isLoggedIn = signal<boolean>(!!this.getToken());

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>('/auth', credentials).pipe(
      tap((res) => {
        const token = res.AccessToken;
        if (token) {
          this.saveSession(token);
        }
      }),
      switchMap((res) =>
        this.fetchUserId().pipe(
          catchError(() => of(null)),
          map(() => res)
        )
      )
    );
  }

  register(user: { username: string; email: string; password: string }) {
    return this.http.post<any>('/api/users', user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isLoggedIn.set(false);
  }

  saveSession(token: string, userId?: string | number) {
    localStorage.setItem('token', token);
    if (userId) {
      localStorage.setItem('userId', String(userId));
    }
    this.isLoggedIn.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  private getPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    return this.getPayload()?.sub ?? null;
  }

  // todo: solución temporal. descarga toda la lista de usuarios para encontrar el id.
  // lo ideal seria que el backend obtenga el id con: authentication.getName() + userRepository.findByUsername(),
  // y quitar los id de los dto requests
  // o agregar el id al token (claim "userId")
  fetchUserId(): Observable<number | null> {
    const username = this.getUsername();
    if (!username) return of(null);

    const endpoint = this.isAdmin() ? '/api/users' : '/api/users/user';

    return this.http.get<{ id: number; username: string }[]>(endpoint).pipe(
      map((users) => users.find((u) => u.username === username)?.id ?? null),
      tap((id) => {
        if (id !== null) localStorage.setItem('userId', String(id));
      })
    );
  }

  isAdmin(): boolean {
    const authorities = this.getPayload()?.authorities || [];
    return authorities.includes('ROLE_ADMIN');
  }

  isArtist(): boolean {
    const authorities = this.getPayload()?.authorities || [];
    return authorities.includes('ROLE_ARTIST');
  }
}
