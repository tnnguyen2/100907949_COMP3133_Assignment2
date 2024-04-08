import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticationGuard} from "./authentication.guard";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";
import {EmployeeCreateComponent} from "./employee-create/employee-create.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {SignUpComponent} from "./sign-up/sign-up.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent , canActivate:[AuthenticationGuard]},
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate:[AuthenticationGuard] },
  { path: 'addEmployee', component: EmployeeCreateComponent, canActivate:[AuthenticationGuard] },
  { path: 'updateEmployee/:id', component: EmployeeEditComponent, canActivate:[AuthenticationGuard] },
  { path: 'signup', component: SignUpComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
