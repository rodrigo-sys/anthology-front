import { Routes } from '@angular/router';
import { Playlists } from './pages/playlists/playlists';
import { PlaylistDetail } from './pages/playlist-detail/playlist-detail';

export const routes: Routes = [
  { path: 'playlists', component: Playlists },
  { path: 'playlists/:id', component: PlaylistDetail },
];
