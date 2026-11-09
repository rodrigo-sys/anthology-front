import { Routes } from '@angular/router';
import { SuggestionsPage } from './pages/suggestions/suggestions';
import { SuggestionCreatePage } from './pages/suggestion-create/suggestion-create';

export const routes: Routes = [
  { path: 'suggestions', component: SuggestionsPage },
  { path: 'suggestions/new', component: SuggestionCreatePage }
];
