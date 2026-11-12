import { Routes } from '@angular/router';
import { Albums } from './pages/albums/albums';
import { CommentsPage } from './pages/comments/comments';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';
import { PlaylistDetail } from './pages/playlist-detail/playlist-detail';
import { Playlists } from './pages/playlists/playlists';
import { AllPlaylistsPage } from './pages/all-playlists/all-playlists';
import { SongDetail } from './pages/song-detail/song-detail';
import { Songs } from './pages/songs/songs';
import { SuggestionCreatePage } from './pages/suggestion-create/suggestion-create';
import { SuggestionsPage } from './pages/suggestions/suggestions';
import { UsersPage } from './pages/user/user';
import { ArtistsPage } from './pages/artists/artists';
import { adminGuard } from './guard/admin-guard';
import { authGuard } from './guard/auth-guard';
import { guestGuard } from './guard/guest-guard';
import { ArtistCreate } from './components/artist-create/artist-create';
import { UserCreate } from './components/user-create/user-create';
import { UserEdit } from './components/user-edit/user-edit';
import { UserList } from './components/user-list/user-list';
import { AccessDenied } from './pages/auth/access-denied/access-denied';
import { AccessDeniedLogin } from './pages/auth/access-denied-login/access-denied-login';
import { AdminPage } from './pages/admin-page/admin-page';
import { SongEdit } from './components/song-edit/song-edit';

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
  { path: 'all-playlists', component: AllPlaylistsPage, canActivate: [adminGuard] },
  { path: 'login', component: LoginPage, canActivate: [guestGuard] },
  { path: 'logout', component: LogoutPage },
  { path: 'access-denied', component: AccessDenied },
  { path: 'access-denied-login', component: AccessDeniedLogin },
  { path: 'artist-create', component: ArtistCreate },
  { path: 'user-create', component: UserCreate },
  { path: 'user-edit', component: UserEdit },
  { path: 'user-list', component: UserList },
  { path: 'access-denied-login', component: AccessDeniedLogin },
  { path: 'admin', component: AdminPage, canActivate: [adminGuard] },
  { path: '**', redirectTo: 'songs' }
];
