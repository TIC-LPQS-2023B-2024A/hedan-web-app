import { Routes } from '@angular/router';
import { TemplateComponent } from '../../shared/layouts/template/template.component';


export const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'lista-ninos',
        loadComponent: () =>
          import('./pages/child-list-page/child-list-page.component').then(
            m => m.ChildListPageComponent
          ),
      },
      {
        path: 'nuevo-psicologo',
        loadComponent: () =>
          import('./pages/new_psychologist_page/new-psychologist-page.component').then(
            m => m.NewPsychologistComponent
          ),
      },
      {
        path: 'actualizar-psicologo/:cedula',
        loadComponent: () =>
          import('./pages/update_psychologist_page/update-psychologist-page.component').then(
            m => m.UpdatePsychologistPageComponent
          ),
      },
      {
        path: 'lista-psicologos',
        loadComponent: () =>
          import('./pages/list-psychologist-page/psychologist-list-page.component').then(
            m => m.PsychologistListComponent
          )
      }
    ],
  }

];
