import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/results_analysis/results-analysis.routes').then(m => m.routes)
  },
  {
      path: 'cuestionario',
      loadChildren: () => import('./modules/questionnaires/routes').then(m => m.routes)
  },
  {
      path: 'pacientes',
      loadChildren: () => import('./modules/patients/routes').then(m => m.routes)
  },
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
