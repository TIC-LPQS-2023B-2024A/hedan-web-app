import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'nuevo',
    loadComponent: () =>
      import('./pages/new-psychologist-page/new-psychologist-page.component').then(
        m => m.NewPsychologistPageComponent
      ),
  },
];
