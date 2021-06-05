import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  dbArray:any=[];

  constructor() { }


  isAuthenticated(){
    if (localStorage.getItem('isAuthenticated')==="true") {

      return true;
  } else {
      return false;
  }
  }

  login(user,password){
      this.dbArray = this.getDb();
      let flag=false;
      for(let i=0;i<this.dbArray.length; i++){
        if(this.dbArray[i].username===user && this.dbArray[i].password===password){
          localStorage.setItem('isAuthenticated', 'true');
          this.setUserName(this.dbArray[i].username);
          flag= true;
        }
      }
      return flag;
  }

  logout(){
    localStorage.setItem('isAuthenticated', 'false');
  }

  setDb(arr){
    localStorage.setItem('userDb', JSON.stringify(arr));
  }

  getDb(){
   return JSON.parse(localStorage.getItem('userDb'));
  }

  getUserName(){
    return localStorage.getItem('userName');
  }

  setUserName(name){
    localStorage.setItem('userName', name);
  }
}