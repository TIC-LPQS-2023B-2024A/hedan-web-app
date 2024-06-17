import { Routes } from '@angular/router';
import { TemplateComponent } from '../../shared/layouts/template/template.component';

export const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/patients-list/patients-list.component').then(
            (m) => m.PatientsListComponent,
          ),
      },
      {
        path: 'lista',
        loadComponent: () =>
            import('./pages/patients-list/patients-list.component').then(
              (m) => m.PatientsListComponent,
            ),
      }
    ],
  },
];
