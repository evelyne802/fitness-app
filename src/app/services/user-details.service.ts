import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDetails, UserSignUpDetails } from '../../types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {
  private supabase: SupabaseClient
  private currentUser: UserDetails = { firstName: '', lastName: '', email: '', level: '' };
  private confirmationCode = '';
  private supabaseUrl = 'https://sexgododdphtwnzpqtwn.supabase.co'
  private supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleGdvZG9kZHBodHduenBxdHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NDg4MDIsImV4cCI6MjA0ODIyNDgwMn0.GrE6mf8oQBhVb6U8Imw_iCm8K6DDE864LdboVuYjJyo'


  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseApiKey);
  }

  async addUser(userDetails: UserSignUpDetails){
    this.currentUser = { 
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      level: userDetails.level
    };

    console.log(userDetails);

    const { data, error } = await this.supabase
    .from('users')
    .insert({
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
      level: userDetails.level
    })
    .select();
    console.log(data);

    if(error){
      console.error(error.stack);
    }
   
  }

  getCurrentUser(){
    return this.currentUser;
  }

  setConfirmationCode(){
    let code = Math.round(Math.random() * (9999 - 1000) + 1000).toString();  // Generates 4-digit code
    this.confirmationCode = code;
  }

  getConfirmationCode(){
    return this.confirmationCode;
  }

  async doesEmailExist(email: string){
    const { data , error } = await this.supabase
    .from("users")
    .select()
    .eq('email', email);

    if(error){
      console.log(error);
    }
    return data;
  }

  async checkUserLogin(email: string, password: string){
      const { data , error } = await this.supabase
      .from("users")
      .select()
      .eq('email', email)
      .eq('password', password);
      
      if(error){
        console.error(error);4
      }
      console.log(data);
      return data;
  }

  checkValidEmail(email: string){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

}
