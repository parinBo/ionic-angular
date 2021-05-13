import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth'
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,private anFire:AngularFireAuth) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
