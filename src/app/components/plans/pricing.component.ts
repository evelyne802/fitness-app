import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})

export class PricingComponent {
  ngOnInit(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
