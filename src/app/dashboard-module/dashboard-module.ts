import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component'
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component'
import { LogoutComponent } from './logout/logout.component'
import { DashboardModuleComponent } from './dashboard-module.component'

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardModuleComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user/edit', component: EditUserDetailsComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, EditUserDetailsComponent, LogoutComponent, DashboardModuleComponent]
})
export class DashboardModule { }
