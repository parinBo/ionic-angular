import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uid:string=""
  constructor(private auth:AngularFireAuth) {
   }
  
  async signin(id:string,password:string){
    await this.auth.signInWithEmailAndPassword(id,password)
  }
  async singup(id:string,password:string){
    await this.auth.createUserWithEmailAndPassword(id,password)
  }
  async singout(){
    await this.auth.signOut()
  }

}
