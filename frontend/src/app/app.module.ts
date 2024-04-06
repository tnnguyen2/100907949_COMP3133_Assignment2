import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";
import {EmployeeCreateComponent} from "./employee-create/employee-create.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    SignUpComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,

  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
