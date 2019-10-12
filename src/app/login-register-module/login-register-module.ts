import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component'
import { RegisterUserComponent } from './register-user/register-user.component'
import { LoginRegisterModuleComponent } from './login-register-module.component'

const loginRegisterRoutes: Routes = [
  {
    path: '',
    component: LoginRegisterModuleComponent,
    children: [
      { path: 'user/login', component: LoginComponent },
      { path: 'user/register', component: RegisterUserComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRegisterRoutes),
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, RegisterUserComponent, LoginRegisterModuleComponent]
})
export class LoginRegisterRoutingModule { }
