import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevAuthService {
  private http = inject(HttpClient);

  login() {
    const payload = { username: 'foo', password: '1234', email: 'foo@test.com' };

    this.http.post<any>('/api/users', payload).subscribe({
      next: (userRes) => {
        if (userRes && userRes.id) {
          localStorage.setItem('userId', String(userRes.id));
        }
        this.authenticate();
      },
      error: () => {
        this.authenticate();
      }
    });
  }

  private authenticate() {
    this.http.post<any>('/auth', { username: 'foo', password: '1234' }).subscribe({
      next: (res) => {
        const token = res.AccessToken;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Autenticación exitosa (dev). Token guardado.');
        } else {
          console.log('No se encontró el token en la respuesta.');
        }
      },
      error: (err) => {
        console.log('Error en autenticación dev:', err.error?.message || err.statusText);
      }
    });
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
