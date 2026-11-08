import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
servicio para crear usuario de prueba
user: foo - clave: 123

crea el usuario, guarda el id en local storage y
el interceptor agrega el token a las requests
*/

@Injectable({
  providedIn: 'root'
})
export class DevAuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8081';

  login() {
    const payload = { username: 'foo', password: '123', email: 'foo@test.com' };

    this.http.post<any>(`${this.baseUrl}/api/users`, payload).subscribe({
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
    this.http.post<any>(`${this.baseUrl}/auth`, { username: 'foo', password: '123' }).subscribe({
      next: (res) => {
        const token = res.AccessToken;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Autenticación exitosa (dev). Token guardado.');
        }
      },
      error: (err) => {
        console.log('Error en autenticación (dev):', err.error?.message || err.statusText);
      }
    });
  }
}
