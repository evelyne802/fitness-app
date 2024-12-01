import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import Typed from 'typed.js';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserDetailsService } from '../../services/user-details.service';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  emailFormControl = new FormControl('', [Validators.email, Validators.required ]);
  passwordFormControl = new FormControl('');
  email: any;
  pswrdVisibilityIcon = ''
  hidePassword = true;
  hidePasswordPath = '../../../assets/images/eye-closed.png';
  showPasswordPath = '../../../assets/images/eye-open.png';

  constructor(private userDetailsService: UserDetailsService){}

  async ngOnInit(){
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

  async checkLogIn(){
    let email = this.emailFormControl.value!;
    console.log('does email exists', await this.checkIfEmailExists(email));
  }

  async checkIfEmailExists(email: string){
    const existingEmails = await this.userDetailsService.getAllExistingEmails();
    return existingEmails?.includes(email);
  }

}


