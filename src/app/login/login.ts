import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserInterfaces } from '../models/userinterfaces';
import { UserService } from '../services/user-services';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  fb = inject(FormBuilder) //form builder instance for reactive forms.
  userService = inject(UserService); //injecting user service to handle user-related operations

  formValidators = (controls: AbstractControl): ValidationErrors | null => { //function to return form validators
    const value = controls.value; //get the value of the form controls
    if (!value) {
      return null; //if no value, return null
    }
    let errors: ValidationErrors = {}; //initialize an empty object to hold validation errors
    if(!/[A-Z]/.test(value)) { //check if username contains uppercase letters
      errors ['upperCase'] = 'Field must not contain uppercase letters'; //add error if it does not
      
    }
    return Object.keys(errors).length ? errors : null; //return errors if any, else null
    };
  

  loginForm = this.fb.group({ //defining form controls and their default values
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]], //default value is an empty string
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.formValidators]] //default value is an empty string
  });

  user: UserInterfaces = { //interface to define the structure of user data
    username: '',
    password: '',

  };

  onSubmit() { //method to handle form submission
    this.user = { //assigning form values to user object
      username: this.loginForm.value.username || '', //assigning username from form value or empty string
      password: this.loginForm.value.password || '', //assigning password from form value or empty string
    };
  }
  onSignUp() { //method to handle sign-up action
    console.log("Sign Up clicked"); //log a message to the console when sign-up is clicked
  }
}
