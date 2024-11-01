import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';


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

  constructor(private renderer: Renderer2) {}

  firstNameFormControl = new FormControl('');
  lastNameFormControl = new FormControl('');
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('');

  @ViewChild('novice') noviceButton!: ElementRef<HTMLInputElement>;
  @ViewChild('intermediate') intermediateButton!: ElementRef<HTMLInputElement>;
  @ViewChild('expert') expertButton!: ElementRef<HTMLInputElement>;

  ngOnInit() {
  }

  selectNovice(){
    this.renderer.addClass(this.noviceButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.intermediateButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.expertButton.nativeElement, 'active-circle');
  }

  selectIntermediate(){
    this.renderer.addClass(this.intermediateButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.noviceButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.expertButton.nativeElement, 'active-circle');
  }

  selectExpert(){
    this.renderer.addClass(this.expertButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.noviceButton.nativeElement, 'active-circle');
    this.renderer.removeClass(this.intermediateButton.nativeElement, 'active-circle');
  }

}
