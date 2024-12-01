import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userDetails } from '../../types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {
  private supabase: SupabaseClient
  private userDetails = new BehaviorSubject({});
  private confirmationCode = new BehaviorSubject('');
  private supabaseUrl = 'https://sexgododdphtwnzpqtwn.supabase.co'
  private supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleGdvZG9kZHBodHduenBxdHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NDg4MDIsImV4cCI6MjA0ODIyNDgwMn0.GrE6mf8oQBhVb6U8Imw_iCm8K6DDE864LdboVuYjJyo'

  getUserDetails = this.userDetails.asObservable();
  getConfirmationCode = this.confirmationCode.asObservable();

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseApiKey);
  }

  setUserDetails(userDetails: userDetails){
    this.userDetails.next(userDetails);
  }

  setConfirmationCode(){
    let code = Math.round(Math.random() * (9999 - 1000) + 1000); // Generates 4-digit code
    this.confirmationCode.next(code.toString());
    console.log(code);
  }

  async getAllExistingEmails(){
    try {
      const { data , error } = await this.supabase
      .from("users")
      .select(`email`);

      if(error){
        console.log(error);
      }
      return data?.map((item) => item.email);
    } catch (error) {
      console.log(error);
    }   
    return []; 
  }

}
