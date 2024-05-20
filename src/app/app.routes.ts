import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/psicologos',
    pathMatch: 'full',
  },
  {
    path: 'psicologos',
    loadChildren: () =>
      import('./modules/users_managment/routes').then(m => m.routes),    //canActivate: [loggedInGuard],
  },

];
