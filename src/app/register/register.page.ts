import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {AlertController, NavController} from '@ionic/angular'
import { AlertService } from '../services/Alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  id:string=""
  password:string=""
  cpassword:string=""
  constructor(public agFire:AngularFireAuth,private alertSer:AlertService,private navCtrl:NavController) { }

  ngOnInit() {
  }
  goBack(){
    this.navCtrl.pop();
  }
  async onSingup(){
    const {id,password,cpassword} = this
    if(password!=cpassword){
      this.alertSer.msg("Fail!","Password doesn't match")
    }else{
      try{
        const res = await this.agFire.createUserWithEmailAndPassword(id,password)
        this.alertSer.msg("Success!","Go to login")
        this.navCtrl.navigateForward(['/login'])
      }catch(err){
        this.alertSer.msg("Fail!",err.message)
      }
    }
   
  }

}
