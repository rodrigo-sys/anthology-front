import { Routes } from '@angular/router';
import { Home } from './auth/pages/home/home';

import { authGuardFnLogin } from './auth/guard/auth.guard.fn.login';
import { PageLogin } from './auth/pages/page-login/page-login';
import { AccessDenied } from './auth/pages/access-denied/access-denied';
import { authGuardFnLogout } from './auth/guard/auth.guard.fn.logout';
import { AccessDeniedLogin } from './auth/pages/access-denied-login/access-denied-login';
import { authGuardFn } from './auth/guard/auth.guard.fn';
import { AdminPage } from './auth/pages/admin-page/admin-page';


export const routes: Routes = [
      {
        path:'home',
        component:Home
      },
      {
      path:'login', 
      component: PageLogin, 
      canActivate: [authGuardFnLogin]
    },
    {
        path:'access-denied',
        component:AccessDenied,
        canActivate:[authGuardFnLogout]
    },
    {
        path:'access-denied-login',
        component:AccessDeniedLogin,
        canActivate:[authGuardFn]
    },
    {
        path:'admin',
        component:AdminPage,
        canActivate:[authGuardFn]
    },
    {
        path:'**',
        redirectTo:'home',
        pathMatch:'full'

    }
];
