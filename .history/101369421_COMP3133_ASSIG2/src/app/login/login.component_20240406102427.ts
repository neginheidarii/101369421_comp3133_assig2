import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Hardcoded check for email and password
      if (email === 'example@example.com' && password === 'password') {
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to employee list page
        this.router.navigate(['employees']);
      } else {
        // Simulate login failure
this.router.navigate(['employees']);      }
    }
  }
}
