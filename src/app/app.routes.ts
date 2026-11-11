import { Routes } from '@angular/router';
import { Albums } from './pages/albums/albums';
import { SongDetail } from './pages/song-detail/song-detail';
import { Songs } from './pages/songs/songs';

export const routes: Routes = [
  { path: '', redirectTo: 'songs', pathMatch: 'full' },
  { path: 'songs', component: Songs },
  { path: 'songs/:id', component: SongDetail },
  { path: 'albums', component: Albums },
  { path: '**', redirectTo: 'songs' },
];
