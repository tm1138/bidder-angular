import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  exports: [ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
