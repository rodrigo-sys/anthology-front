import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>('/auth', credentials);
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

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      const authorities = payload.authorities || [];
      return authorities.includes('ROLE_ADMIN');
    } catch {
      return false;
    }
  }
}
