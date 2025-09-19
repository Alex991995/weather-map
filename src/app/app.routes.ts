import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { RegisterComponent } from '@pages/register/register.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  // {
  //   path: 'login',
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
];
