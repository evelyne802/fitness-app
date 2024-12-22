import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDetails, UserSignUpDetails } from '../../types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {
  private supabase: SupabaseClient
  private supabaseUrl = 'https://sexgododdphtwnzpqtwn.supabase.co'
  private supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleGdvZG9kZHBodHduenBxdHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NDg4MDIsImV4cCI6MjA0ODIyNDgwMn0.GrE6mf8oQBhVb6U8Imw_iCm8K6DDE864LdboVuYjJyo'
  confirmationCode = '';
  currentUser: UserDetails = { firstName: '', lastName: '', email: '', level: '' };
  tempUser: UserSignUpDetails = { firstName: '', lastName: '', email: '', password: '', level: '' };
  saltRounds = 10;
  hashedPassword = '';
  correctLogIn = false;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseApiKey);
  }

  
  async addUser(){
    
    bcrypt.hash(this.tempUser.password, this.saltRounds, async (err, hash) => {
      const { data, error } = await this.supabase
      .from('users')
      .insert({
        first_name: this.tempUser.firstName,
        last_name: this.tempUser.lastName,
        email: this.tempUser.email,
        password: hash,
        level: this.tempUser.level
      })
      .select();
      if(error){
        console.log("Error inserting user: ", error);
      }
      if(err){
        console.log("Error hashing password: ", err);
      }
    });
  }


  // when signing up - users are temporary, until they finish signing up
  getTempUserEmail(){
    return this.tempUser.email;
  }

  setTempUser(user: UserSignUpDetails){
    this.tempUser = user;
  }

  // when users finish with signing up, they are redirected to the website and become "current user"
  async setTempUserToCurrent(){
    this.currentUser = {
      firstName: this.tempUser.firstName,
      lastName: this.tempUser.lastName,
      email: this.tempUser.email,
      level: this.tempUser.level
    }
  }
 
  getCurrentUser(){
    return this.currentUser;
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
      .eq('email', email);
      if(error){
        console.error("Error selecting from db: ", error);
      }

      // If user with given email exists
      if(data !== null && data.length>0){
        const storedHashedPassword = data[0].password; 
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            console.error("Error comparing passwords:", err);
          }
          if (result) {  // is passwords match, proceed to set user as current user
            console.log('passwords match!');
            this.currentUser = {
              firstName: data[0].first_name,
              lastName: data[0].last_name,
              email: data[0].email,
              level: data[0].level
            }
          }
        });
        return true;
      }
      return false;
  }

  checkValidEmail(email: string){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

}
