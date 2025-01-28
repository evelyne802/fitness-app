import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { NgIf } from '@angular/common';
import { UserDetailsService } from '../../services/user-details.service';
import { EmailService } from '../../services/email.service';


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

  email: string = this.userDetailsService.getTempUserEmail();
  code: string = '';

  constructor( private userDetailsService: UserDetailsService, 
               private router: Router, 
               private emailService: EmailService){}

  codeFormControl = new FormControl('');
  sendCodeClass = 'unavailable';
  timeLeft: number = 59;
  interval: any;
  logInError = '';

  ngOnInit(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.startTimer();
    //alert("You can insert 0000 as your code if you didn't get an email");
  }

  startTimer() {
      this.timeLeft = 59;
      this.sendCodeClass = 'unavailable';
      this.code = this.emailService.getConfirmationCode();
      this.emailService.sendEmail(this.email, this.code);

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
      if(this.codeFormControl.value === this.code || this.codeFormControl.value === '0000'){
        this.userDetailsService.addUser();
        this.userDetailsService.setTempUserToCurrent();
        this.router.navigateByUrl('/pricing');
      } else {
        this.logInError = `Wrong code entered`;
      }
    }

}
