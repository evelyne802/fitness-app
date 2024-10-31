import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  firstNameFormControl = new FormControl('');
  lastNameFormControl = new FormControl('');
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('');

}
