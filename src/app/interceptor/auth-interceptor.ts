import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isLogin = req.url.includes('/auth');
  const isRegister = req.url === '/api/users' && req.method === 'POST';

  if (isLogin || isRegister) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};
