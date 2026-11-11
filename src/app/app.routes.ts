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
import { UsersPage } from './pages/user/user';
import { ArtistsPage } from './pages/artists/artists';
import { adminGuard } from './guard/admin-guard';
import { authGuard } from './guard/auth-guard';
import { ArtistCreate } from './components/artist-create/artist-create';
import { UserCreate } from './components/user-create/user-create';
import { UserEdit } from './components/user-edit/user-edit';
import { UserList } from './components/user-list/user-list';
import { ArtistEdit } from './components/artist-edit/artist-edit';
import { ArtistList } from './components/artist-list/artist-list';

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
  { path: 'users', component: UsersPage },
  { path: 'artists', component: ArtistsPage },
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
   { path: 'artist-create', component: ArtistCreate ,canActivate:[adminGuard]},
   {path:'user-create',component:UserCreate,canActivate:[authGuard]},
   {path:'user-edit',component:UserEdit,canActivate:[authGuard]},
   {path:'user-list',component:UserList, canActivate:[adminGuard]},
  {path:'artist-edit',component:ArtistEdit, },
  {path:'artist-list',component:ArtistList, canActivate:[adminGuard]},
  { path: '**', redirectTo: 'songs' }
  
];
