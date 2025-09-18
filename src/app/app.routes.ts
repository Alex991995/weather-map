import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // {
  //   path: 'register',
  // },
  // {
  //   path: 'login',
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'route',
      // },
    ],
  },
];
