import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { LoginComponent } from './login/login.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { UpdateEmployeeComponent } from './updateemployee/updateemployee.component';
import { AddEmployeeComponent } from './addemployee/addemployee.component';
import { SignupComponent } from './signup/signup.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EmployeelistComponent,
    LoginComponent,
    EmployeedetailsComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
