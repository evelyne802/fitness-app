import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import Typed from 'typed.js';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

 // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');

  ngOnInit(){
    const firstTyped = new Typed('#typed', {
      strings: ['Your Favorite Fitness App.', 'Your Best Fitness App.'],
      typeSpeed: 80,
      backDelay: 1000,
      backSpeed:0,
      loop: false,
      cursorChar: ''
    });
  }
}
