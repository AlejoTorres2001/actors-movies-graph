import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './pages/index/index.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IndexPage,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
export const RoutingModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
