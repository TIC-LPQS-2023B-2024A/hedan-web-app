import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import { provideUserDataInitializer } from './core/initializers/user-data-initializer';
import { UnAuthInterceptor } from './core/interceptor/unauth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideUserDataInitializer(),
    { provide: HTTP_INTERCEPTORS, useClass: UnAuthInterceptor, multi: true },
  ],
};
