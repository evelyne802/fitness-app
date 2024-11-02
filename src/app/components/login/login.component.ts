import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

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
