import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from '../services/Alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id:string=""
  password:string=""
  constructor(private navCtrl:NavController,private alSer:AlertService,private user:UserService) { }

  ngOnInit() {
  }
  goBack(){
    this.navCtrl.pop();
  }
  async onLogin(){
    const {id,password} = this
    try{
      await this.user.signin(id,password)
      this.user.setId()
      this.navCtrl.navigateForward(['/'])
    }catch(err){
      this.alSer.msg("Fail!",err.message)
    }
  }

}
