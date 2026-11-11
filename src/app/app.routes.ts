import { Routes } from '@angular/router';
import { Albums } from './pages/albums/albums';
import { CommentsPage } from './pages/comments/comments';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';
import { SongDetail } from './pages/song-detail/song-detail';
import { Songs } from './pages/songs/songs';

export const routes: Routes = [
  { path: '', redirectTo: 'songs', pathMatch: 'full' },
  { path: 'songs', component: Songs },
  { path: 'songs/:id', component: SongDetail },
  { path: 'albums', component: Albums },
  { path: 'comments', component: CommentsPage },
  { path: 'comments/:songVersionId', component: CommentsPage },
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
  { path: '**', redirectTo: 'songs' },
];
