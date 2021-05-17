import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  name:string=""
  constructor(private navCtrl:NavController,private user:UserService) { }

  ngOnInit() {
  }
  async onLogout(){
    await this.user.singout()
    this.navCtrl.navigateForward(['/'])
  }

}
