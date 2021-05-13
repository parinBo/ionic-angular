import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private anFire:AngularFireAuth) { }

  ngOnInit() {
  }
  async onLogout(){
    const res =await this.anFire.signOut()
  }

}
