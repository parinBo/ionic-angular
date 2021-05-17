import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

interface User{
  uid:string,
  name:string,
  email:string,
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private u:User 
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

  setId(){
    try{
      this.auth.user.subscribe(ss=>{
        this.u.uid = ss.uid
        console.log(this.u.uid)
      })
    }catch(err){
      console.log(err)
    }
    
  }
  getUid(){
    return this.u.uid
  }

}
