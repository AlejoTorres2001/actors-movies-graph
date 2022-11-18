import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
export const RoutingModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
