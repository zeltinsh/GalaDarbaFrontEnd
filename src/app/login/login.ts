import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserInterfaces } from '../models/userinterfaces';
import { UserService } from '../services/user-services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  router = inject(Router); //injecting router to navigate between routes
  fb = inject(FormBuilder) //form builder instance for reactive forms.
  userService = inject(UserService); //injecting user service to handle user-related operations

  formValidators = (controls: AbstractControl): ValidationErrors | null => { //function to return form validators
    const value = controls.value; //get the value of the form controls
    if (!value) {
      return null; //if no value, return null
    }
    let errors: ValidationErrors = {}; //initialize an empty object to hold validation errors
    if(!/[A-Z]/.test(value)) { //check if password contains uppercase letters
      errors ['upperCase'] = 'Field must contain at least one uppercase letter'; //add error if it does not
      
    }
    return Object.keys(errors).length ? errors : null; //return errors if any, else null
    };
  

  loginForm = this.fb.group({ //defining form controls and their default values
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]], //default value is an empty string
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.formValidators]] //default value is an empty string
  });

  user: UserInterfaces = { //interface to define the structure of user data
    name: '',
    password: '',

  };

  onSubmit() { 
    if (this.loginForm.valid) { 
      this.user = { 
        name: this.loginForm.value.username || '', 
        password: this.loginForm.value.password || '', 
      };
      
      this.userService.login(this.user).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      });
    }
  }
  onSignUp() {
    console.log("Sign Up clicked"); 
    this.router.navigate(['/main']);
  }
}
