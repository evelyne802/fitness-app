import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { NgIf } from '@angular/common';
import { UserDetailsService } from '../../services/user-details.service';
import { UserDetails } from '../../../types';


@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

  userDetails: UserDetails = this.userDetailsService.getCurrentUser();
  code: string = this.userDetailsService.getConfirmationCode();

  constructor(private userDetailsService: UserDetailsService){}

  codeFormControl = new FormControl('');
  sendCodeClass = 'unavailable';
  timeLeft: number = 59;
  interval: any;

  ngOnInit(){
    this.startTimer();
  }

  startTimer() {
      this.timeLeft = 59;
      this.sendCodeClass = 'unavailable';

      this.interval = setInterval(() => {
        if(this.timeLeft == 0){
          clearInterval(this.interval);
          this.sendCodeClass = 'available';
        }
        else if(this.timeLeft > 0) {
          this.timeLeft--;
        } 
        else {
          this.timeLeft = 59;
        }

      },1000)
    }

    checkCode(){
      console.log(this.code);
      console.log(this.codeFormControl.value);
    }

}
