import { Routes } from '@angular/router';
import { TemplateComponent } from '../../shared/layouts/template/template.component';

export const routes: Routes = [
{
  path: '',
    component: TemplateComponent,
    children: [{
    path: '',
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page.component').then(
        m => m.DashboardPageComponent
      ),
  }]}
];
