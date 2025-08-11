// pages/pages.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';

export const adminRoutes: Routes = [
    { path: '', component: DashboardComponent  },
];
