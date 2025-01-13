import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserDetailsService } from '../../services/user-details.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  pswrdVisibilityIcon = ''
  hidePassword = true;
  hidePasswordPath = '../../../assets/images/eye-closed.png';
  showPasswordPath = '../../../assets/images/eye-open.png';
  logInError = '';

  constructor(private userDetailsService: UserDetailsService, private router: Router){}

  async ngOnInit(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const firstTyped = new Typed('#typed', {
      strings: ['Your Favorite Fitness App.', 'Your Best Fitness App.'],
      typeSpeed: 80,
      backDelay: 1000,
      backSpeed:0,
      loop: false,
      cursorChar: ''
    });
  }

  changePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  async logIn(){
    this.logInError = await this.checkErrors();
    if(this.logInError == ''){
      console.log(this.emailFormControl.value!);
      this.router.navigate(['/pricing'], { skipLocationChange: true });
    }
  }

  async checkErrors(){
    const email = this.emailFormControl.value!;
    const password = this.passwordFormControl.value!;

    if(email == '' || password == '') return 'Fill out all fields to continue';
    if(!this.userDetailsService.checkValidEmail(email)) return 'Invalid Email address';
    if(!await this.checkUserLogin(email, password)) return 'Email or password are incorrect';

    return '';
  }

  async checkUserLogin(email: string, password: string){
    const userDetails = await this.userDetailsService.checkUserLogin(email, password);
    console.log(userDetails);
    return userDetails;
  }

}




