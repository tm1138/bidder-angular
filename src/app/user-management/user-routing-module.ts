import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { LoginFormComponent } from './login-form/login-form.component'

const userRoutes: Routes = [
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'register',
        component: InputUserDataFormComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})

export class UserRoutingModule { }