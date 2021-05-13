import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from '../services/Alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id:string=""
  password:string=""
  constructor(public agFire:AngularFireAuth,private navCtrl:NavController,private alSer:AlertService) { }

  ngOnInit() {
  }
  goBack(){
    this.navCtrl.pop();
  }
  async onLogin(){
    const {id,password} = this
    try{
      const res = await this.agFire.signInWithEmailAndPassword(id,password)
      this.navCtrl.navigateForward(['/'])
    }catch(err){
      this.alSer.msg("Fail!",err.message)
    }
  }

}
