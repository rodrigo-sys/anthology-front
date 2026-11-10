import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  error = signal<string>('');

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.getRawValue();

    this.authService.login({ username, password }).subscribe({
      next: (res) => {
        const token = res.AccessToken;
        if (token) {
          this.authService.saveSession(token);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Credenciales inválidas');
      }
    });
  }
}
