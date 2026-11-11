import { Routes } from '@angular/router';
import { Albums } from './pages/albums/albums';
import { CommentsPage } from './pages/comments/comments';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';
import { PlaylistDetail } from './pages/playlist-detail/playlist-detail';
import { Playlists } from './pages/playlists/playlists';
import { SongDetail } from './pages/song-detail/song-detail';
import { Songs } from './pages/songs/songs';
import { SuggestionCreatePage } from './pages/suggestion-create/suggestion-create';
import { SuggestionsPage } from './pages/suggestions/suggestions';
import { adminGuard } from './guard/admin-guard';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'songs', pathMatch: 'full' },
  { path: 'songs', component: Songs },
  { path: 'songs/:id', component: SongDetail },
  { path: 'albums', component: Albums },
  { path: 'comments', component: CommentsPage, canActivate: [adminGuard] },
  { path: 'comments/:songVersionId', component: CommentsPage, canActivate: [authGuard] },
  { path: 'suggestions', component: SuggestionsPage, canActivate: [adminGuard] },
  { path: 'suggestions/new', component: SuggestionCreatePage, canActivate: [authGuard] },
  { path: 'playlists', component: Playlists, canActivate: [authGuard] },
  { path: 'playlists/:id', component: PlaylistDetail, canActivate: [authGuard] },
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
  { path: '**', redirectTo: 'songs' },
];
