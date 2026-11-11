import { Routes } from '@angular/router';
import { CommentsPage } from './pages/comments/comments';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
  { path: 'comments', component: CommentsPage, canActivate: [authGuard] },
  { path: 'comments/:songVersionId', component: CommentsPage, canActivate: [authGuard] }
];
