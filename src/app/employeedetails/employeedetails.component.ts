import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../graphql.operations';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  employeeId?: string;
  employee?: Employee; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    // Get the employee ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('employeeId') ?? ''; 
      // Fetch the employee details using GraphQL query
      this.apollo.watchQuery<any>({
        query: GET_EMPLOYEE_BY_ID,
        variables: { _id: this.employeeId }
      }).valueChanges.subscribe(({ data }) => {
        this.employee = data.getEmployeeByID;
      });
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}

