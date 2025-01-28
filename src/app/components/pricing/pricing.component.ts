import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})

export class PricingComponent {

  constructor( private router: Router ){}

  ngOnInit(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  redirectHome(){
    this.router.navigateByUrl('/home');
  }

  redirectBilling(){
    this.router.navigateByUrl('/billing');
  }
}
