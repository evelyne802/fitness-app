import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserDetailsService } from '../../services/user-details.service';
import { EmailService } from '../../services/email.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor( private renderer: Renderer2, 
               private userDetailsService: UserDetailsService, 
               private router: Router,
               private emailService: EmailService ) {}

  hidePassword = true;
  hidePasswordPath = '../../../assets/images/eye-closed.png';
  showPasswordPath = '../../../assets/images/eye-open.png';
  firstNameFormControl = new FormControl('');
  lastNameFormControl = new FormControl('');
  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  chosenLevel = '';
  signUpError = '';

  @ViewChild('novice') noviceButton!: ElementRef<HTMLInputElement>;
  @ViewChild('intermediate') intermediateButton!: ElementRef<HTMLInputElement>;
  @ViewChild('expert') expertButton!: ElementRef<HTMLInputElement>;

  ngOnInit() {
  }

  changePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  selectNovice(){
    this.renderer.addClass(this.noviceButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.intermediateButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.expertButton.nativeElement, 'active-circle');
    this.chosenLevel = 'novice';
  }

  selectIntermediate(){
    this.renderer.addClass(this.intermediateButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.noviceButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.expertButton.nativeElement, 'active-circle');
    this.chosenLevel = 'intermediate';
  }

  selectExpert(){
    this.renderer.addClass(this.expertButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.noviceButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.intermediateButton.nativeElement, 'active-circle');
    this.chosenLevel = 'expert';
  }

  generateConfirmationCode() {
    this.emailService.setConfirmationCode();
  }

  // TODO : verify email address ( correct format + check if there isn't an account with the same email )
  async signUp(){
    const email = this.emailFormControl.value!;
    const password = this.passwordFormControl.value!;
    const firstName = this.firstNameFormControl.value!;
    const lastName = this.lastNameFormControl.value!;

    this.signUpError = await this.checkErrors(email, password, firstName, lastName);
    
    if(this.signUpError == ''){
      this.generateConfirmationCode();
      this.userDetailsService.setTempUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        level: this.chosenLevel
      });
      this.router.navigate(['/confirmation'], { skipLocationChange: true });
    }
  } 

  async checkErrors(email: string, password: string, firstName: string, lastName: string){
    if(email == '' || password == '' || firstName == '' || lastName == '') return 'Fill out all fields to continue';
    if(!this.userDetailsService.checkValidEmail(email)) return 'Invalid Email address';
    if(await this.emailExists(email)) return 'Account already exists for given email address';
    if(this.chosenLevel == '') return 'Please choose your level to continue';

    return '';
  }

  async emailExists(email: string){
    const existingEmails = await this.userDetailsService.doesEmailExist(email);
    return existingEmails!.length > 0;
  }
  
}
