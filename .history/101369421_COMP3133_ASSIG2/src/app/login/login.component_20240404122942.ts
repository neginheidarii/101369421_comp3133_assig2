import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql.operations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 
  errorMessage: string = ''; 
  
  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apollo
        .watchQuery({
          query: LOGIN,
          variables: { email, password }
        })
        .valueChanges.subscribe(
          ({ data }) => {
            // Redirect to employee list page
            this.router.navigate(['employees']);
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
  }
  
}