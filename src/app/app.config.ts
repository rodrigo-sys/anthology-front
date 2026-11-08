import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { devAuthInterceptor } from './interceptor/dev-auth-interceptor';
import { DevAuthService } from './service/dev-auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([devAuthInterceptor])),
    provideAppInitializer(() => {
      inject(DevAuthService).login();
    })
  ]
};
