import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userDetails } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private userDetails = new BehaviorSubject({});
  private confirmationCode = new BehaviorSubject('');

  getUserDetails = this.userDetails.asObservable();
  getConfirmationCode = this.confirmationCode.asObservable();

  constructor() { }

  setUserDetails(userDetails: userDetails){
    this.userDetails.next(userDetails);
  }

  setConfirmationCode(){
    let code = Math.round(Math.random() * (9999 - 1000) + 1000); // Generates 4-digit code
    this.confirmationCode.next(code.toString());
    console.log(code);
  }

}
