import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  confirmationCode: string = '';

  constructor(private http: HttpClient) { }

  sendEmail(email: string, code: string){
      this.http.get(`https://gympal-app-b9ee398c6511.herokuapp.com/send-email/${email}/${code}`).subscribe(buffer => {
        console.log(buffer);
    });
  }
  
  
  getConfirmationCode(){
    this.confirmationCode = Math.round(Math.random() * (9999 - 1000) + 1000).toString();  // Generates 4-digit code;
    return this.confirmationCode;
  }
}
