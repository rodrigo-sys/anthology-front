import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage }
];
