import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UPDATE_EMPLOYEE, GET_EMPLOYEE_BY_ID } from '../graphql.operations';
import { Employee } from '../models/Employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.css']
})
export class UpdateEmployeeComponent {

  employeeId!: string; 
  employee!: Employee; 
  updatedEmployee!: Employee; 

  constructor(private apollo: Apollo, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch employee data from backend using employeeId
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('employeeId') ?? ''; 
      // Fetch the employee details using GraphQL query
      this.apollo.watchQuery<any>({
        query: GET_EMPLOYEE_BY_ID,
        variables: { _id: this.employeeId }
      }).valueChanges.subscribe(({ data }) => {
        this.employee = data.getEmployeeByID;
        // Create mutable copy of employee object
        this.updatedEmployee = Object.assign({}, this.employee);
      });
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  // Function to handle form submission
  updateEmployee() {
    this.apollo.mutate<{ updateEmployee: Employee }>({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        _id: this.updatedEmployee._id,
        first_name: this.updatedEmployee.first_name,
        last_name: this.updatedEmployee.last_name,
        email: this.updatedEmployee.email,
        gender: this.updatedEmployee.gender,
        salary: this.updatedEmployee.salary
      }
    }).subscribe(({ data }) => {
      console.log('Employee updated:', data!.updateEmployee);
      this.router.navigate(['/employees']);
    }, (error) => {
      console.error('Error updating employee:', error);
    });
  }
}
