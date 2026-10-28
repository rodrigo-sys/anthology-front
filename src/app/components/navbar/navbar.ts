import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
    authService = inject(AuthService);
  router = inject(Router);

  logInLogOut() {

    if (!this.authService.estoyLogeado()) {
      this.router.navigateByUrl('login');
    }
    
    else{
      this.authService.logOut();
      this.router.navigateByUrl('home');
    }
  }
}
