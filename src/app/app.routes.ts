import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'city/:slug',
        loadComponent: () =>
          import('@pages/detail-city/detail-city.component').then(
            (m) => m.DetailCityComponent
          ),
        canActivate: [authGuard],
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
      {
        path: 'settings',
        loadComponent: () =>
          import('@pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'comparison',
        loadComponent: () =>
          import('@pages/comparison/comparison.component').then(
            (m) => m.ComparisonComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'history',
        loadComponent: () =>
          import('@pages/history/history.component').then(
            (m) => m.HistoryComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
