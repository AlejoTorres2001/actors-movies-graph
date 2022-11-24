import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: LoginPage,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];
export const RoutingModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
