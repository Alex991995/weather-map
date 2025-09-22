import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'city/:slug',
        loadComponent: () =>
          import('@pages/detail-city/detail-city.component').then(
            (m) => m.DetailCityComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@pages/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
];
