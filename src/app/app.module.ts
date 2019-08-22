import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { UserManagementModule } from './user-management/user-management.module'


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  imports: [
    BrowserModule,
    UserManagementModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],

  declarations: [
    AppComponent,
    HomePageComponent,
  ],

  providers: [],

  exports: [ReactiveFormsModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
