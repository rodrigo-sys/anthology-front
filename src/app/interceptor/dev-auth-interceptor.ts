import { HttpInterceptorFn } from '@angular/common/http';

export const devAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth') || req.url.includes('/api/users')) {
    return next(req);
  }

  const token = localStorage.getItem('token');
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
