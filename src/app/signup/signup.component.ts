import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SIGNUP } from '../graphql.operations';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    _id: '',
    username: '',
    email: '',
    password: '',
  };

  signupForm!: FormGroup;
  successMessage: string = ''; 
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  goBack() {
    // Navigate to login
    this.router.navigate(['/login']);
  }

  signup() {
    if (this.signupForm.valid) {
      console.log('valid');
      const { username, email, password } = this.signupForm.value;
      console.log(this.signupForm.value);
      this.apollo
        .mutate<{ signup: User }>({
          mutation: SIGNUP,
          variables: {
            username,
            email,
            password,
          },
        })
        .subscribe({
          next: ({ data }) => {
            console.log(data);
            this.successMessage = 'Signup successful. Please login to continue';
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = 'Email already exists';
          },
        })
    } else {
      this.errorMessage = "Internal error";
    }
  }
}
