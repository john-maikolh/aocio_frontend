// pages/pages.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './registro/formulario.component';  

export const pagesRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'formulario', component: FormularioComponent },
];
