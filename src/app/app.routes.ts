import { Routes } from '@angular/router';
import { CommentsPage } from './pages/comments/comments';

export const routes: Routes = [
  { path: 'comments/:songVersionId', component: CommentsPage },
  { path: 'comments', component: CommentsPage }
];
