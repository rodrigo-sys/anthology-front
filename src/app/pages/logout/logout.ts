import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-logout',
  imports: [],
  template: `<p>Cerrando sesión...</p>`
})
export class LogoutPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
