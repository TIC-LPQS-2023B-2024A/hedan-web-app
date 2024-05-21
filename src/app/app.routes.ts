import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',  //PEDNDING
        pathMatch: 'full'
    },
    {
        path: 'cuestionario',
        loadChildren: () => import('./modules/questionnaires/routes').then(m => m.routes)
    },
    {
        path: 'pacientes',
        loadChildren: () => import('./modules/patients/routes').then(m => m.routes)
    },
];
