import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController} from '@ionic/angular'
import { AlertService } from '../services/Alert.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  id:string=""
  password:string=""
  cpassword:string=""
  constructor(private alertSer:AlertService,private navCtrl:NavController,private user:UserService) { }

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
        await this.user.singup(id,password)
        this.alertSer.msg("Success!","Go to login")
        this.navCtrl.navigateForward(['/login'])
      }catch(err){
        this.alertSer.msg("Fail!",err.message)
      }
    }
   
  }

}
