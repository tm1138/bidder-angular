import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./dashboard-module/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('./login-register-module/login-register-module').then(m => m.LoginRegisterRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
