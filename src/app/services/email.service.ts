import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  confirmationCode: string = '';

  constructor(private http: HttpClient) { }

  sendEmail(email: string, code: string){
    this.http.get(`http://localhost:3000/send-email/${email}/${code}`).subscribe(buffer => {
  });
  }

  setConfirmationCode(){
    let code = Math.round(Math.random() * (9999 - 1000) + 1000).toString();  // Generates 4-digit code
    this.confirmationCode = code;
  }

  getConfirmationCode(){
    return this.confirmationCode;
  }
}
