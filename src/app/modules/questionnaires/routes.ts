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
          import('./pages/result/result.component').then(
            (m) => m.ResultComponent,
          ),
      },
      {
        path: 'resultado',
        loadComponent: () =>
          import('./pages/result/result.component').then(
            (m) => m.ResultComponent,
          ),
      },
      {
        path: 'nuevo',
        loadComponent: () =>
          import('./pages/new-questionnarie/new-questionnarie.component').then(
            (m) => m.NewQuestionnarieComponent,
          ),
      },
    ],
  },
];
