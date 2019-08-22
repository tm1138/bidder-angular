import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { UserRoutingModule } from './user-routing-module'

import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { LoginFormComponent } from './login-form/login-form.component'

@NgModule({
  declarations: [
    InputUserDataFormComponent,
    DisplayUserDataComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserManagementModule { }
