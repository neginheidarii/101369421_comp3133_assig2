import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql.operations';
import { Employee } from '../models/Employee';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})
export class EmployeelistComponent implements OnInit {
  employees: Employee[] = [];
  error: any;
  showSuccessMessage = false;
  showErrorMessage = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.apollo
      .watchQuery({
        query: GET_EMPLOYEES,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.employees = data.getEmployees;
        this.error = error;
      });
  }

  viewEmployee(employeeId: string) {
    this.router.navigate(['/employee/view', employeeId]);
  }

  updateEmployee(employeeId: string) {
    this.router.navigate(['/employee/update', employeeId]);
  }

  addEmployee() {
    this.router.navigate(['/employee/add']);
  }

  deleteEmployee(employeeId: string) {
    this.apollo
      .mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { _id: employeeId },
        refetchQueries: [
          {
            query: GET_EMPLOYEES,
          },
        ],
      })
      .subscribe({
        next: () => {
          // Success
          this.handleSuccess('Employee deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.handleError('Error deleting employee: ' + error.message);
        },
      });
  }

  private handleSuccess(message: string) {
    this.showErrorMessage = false;
    this.showSuccessMessage = true;
    this.successMessage = message;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000); // Hide success message after 3 seconds
  }

  private handleError(errorMessage: string) {
    this.showSuccessMessage = false;
    this.showErrorMessage = true;
    this.errorMessage = errorMessage;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000); // Hide error message after 3 seconds
  }

  logout() {
    localStorage.clear(); // Clear any stored data in local storage
    this.router.navigate(['/login']); // Navigate to login screen
  }
}
