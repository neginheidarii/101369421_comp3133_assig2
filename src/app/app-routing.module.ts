import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { AddEmployeeComponent } from './addemployee/addemployee.component';
import { UpdateEmployeeComponent } from './updateemployee/updateemployee.component';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeelistComponent },
  { path: 'employee/view/:employeeId', component: EmployeedetailsComponent },
  { path: 'employee/update/:employeeId', component: UpdateEmployeeComponent },
  { path: 'employee/add', component: AddEmployeeComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
