import { Routes } from '@angular/router';
import { SuggestionsPage } from './pages/suggestions/suggestions';
import { SuggestionCreatePage } from './pages/suggestion-create/suggestion-create';
import { LoginPage } from './pages/login/login';
import { LogoutPage } from './pages/logout/logout';
import { authGuard } from './guard/auth-guard';
import { adminGuard } from './guard/admin-guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'logout', component: LogoutPage },
  { path: 'suggestions', component: SuggestionsPage, canActivate: [adminGuard] },
  { path: 'suggestions/new', component: SuggestionCreatePage, canActivate: [authGuard] }
];
