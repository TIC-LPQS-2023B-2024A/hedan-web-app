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
          import('./pages/new-questionnarie/new-questionnarie.component').then(
            (m) => m.NewQuestionnarieComponent,
          ),
      },
      {
        path: 'resultado',
        loadComponent: () =>
          import('./pages/questionnarie-result/questionnarie-result.component').then(
            (m) => m.QuestionnarieResultComponent,
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
