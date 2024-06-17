import { Routes } from '@angular/router';
import {
  loginGuard,
  redirectToMainPageGuard,
  roleGuard,
} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/results_analysis/results-analysis.routes').then(
        (m) => m.routes,
      ),
    canActivate: [loginGuard, roleGuard],
    data: {
      requiredRoles: ['psychologist'],
    },
  },
  {
    path: 'cuestionario',
    loadChildren: () =>
      import('./modules/questionnaires/routes').then((m) => m.routes),
    canActivate: [loginGuard, roleGuard],
    data: {
      requiredRoles: ['psychologist'],
    },
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./modules/patients/routes').then((m) => m.routes),
    canActivate: [loginGuard, roleGuard],
    data: {
      requiredRoles: ['psychologist'],
    },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/routes').then((m) => m.routes),
    canActivate: [redirectToMainPageGuard],
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./modules/users_managment/routes').then((m) => m.routes),
    canActivate: [loginGuard, roleGuard],
    data: {
      requiredRoles: ['admin'],
    },
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./modules/auth/pages/logout-page/logout-page.component').then(
        (m) => m.LogoutPageComponent,
      ),
  },
];
