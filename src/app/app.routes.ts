import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/routes').then(m => m.routes),    //canActivate: [loggedInGuard],
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./modules/users_managment/routes').then(m => m.routes),    //canActivate: [loggedInGuard],
  },

];
