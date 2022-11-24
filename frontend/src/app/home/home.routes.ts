import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './pages/index/index.page';
const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];
export const RoutingModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
