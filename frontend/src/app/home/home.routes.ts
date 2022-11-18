import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
export const RoutingModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
