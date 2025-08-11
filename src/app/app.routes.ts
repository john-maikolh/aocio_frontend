import { Routes } from '@angular/router';
import { pagesRoutes } from './features/pages/pages.routes';
import { adminRoutes } from './features/admin/admin.routes';

export const routes: Routes = [
    
    {
        path: '',
        children: pagesRoutes 
    },
    {
        path: 'admin',
        children: adminRoutes // rutas para el administrador
    },
];


