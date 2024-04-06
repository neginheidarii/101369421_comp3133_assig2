import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_EMPLOYEE } from '../graphql.operations';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddEmployeeComponent {
  employee: Employee = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0
  };

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) { }

  goBack() {
    this.router.navigate(['/employees']);
  }
  
  // Function to handle form submission
  onSubmit() {
    this.apollo.mutate<{ addEmployee: Employee }>({
      mutation: ADD_EMPLOYEE,
      variables: {
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        email: this.employee.email,
        gender: this.employee.gender,
        salary: this.employee.salary
      }
    }).subscribe(({ data }) => {
      console.log('Employee added:', data!.addEmployee);
      // Reset form after successful submission
      this.employee = {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        salary: 0
      };
    }, (error) => {
      console.error('Error adding employee:', error);
    });
  }
}
