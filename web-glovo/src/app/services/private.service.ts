import { Injectable } from '@angular/core';
declare module namespace {

  export interface Auth {
      token: string;
      type: string;
      expires_in: number;
  }

  export interface User {
      id: number;
      name: string;
      email: string;
      address: string;
      phone: string;
      approved_account: boolean;
      suspended_at?: any;
      created_at: Date;
      updated_at: Date;
      roles: string[];
      shareholder?: any;
  }

  export interface RootObject {
      auth: Auth;
      user: User;
  }

}

@Injectable({
  providedIn: 'root'
})

export class PrivateService {
  user! : namespace.User | undefined
  constructor() {

   }
   init(user : namespace.User | undefined){
     this.user = user; 
     
   }
}
