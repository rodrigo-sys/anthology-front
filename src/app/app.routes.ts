import { Routes } from '@angular/router';
import { Playlists } from './pages/playlists/playlists';
import { PlaylistDetail } from './pages/playlist-detail/playlist-detail';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
  { path: 'playlists', component: Playlists, canActivate: [authGuard] },
  { path: 'playlists/:id', component: PlaylistDetail, canActivate: [authGuard] }
];
