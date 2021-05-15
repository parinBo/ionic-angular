import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '../Tasks';
import { TaskServices } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  tasks:Task[]
  rate:Number=0
  constructor(private navCtrl:NavController,private taskser:TaskServices) { }
  ngOnInit() {
    this.initialize()
  }
  initialize(){
    this.taskser.getTask()
    this.taskser.getTaskUpdate().subscribe(ss=>{
      this.tasks= ss
    })
    this.taskser.getRateUpdate().subscribe(ss=>{
      this.rate = ss
    })
  }

  goBack(){
    this.navCtrl.back()
  }

  async onRemove(task){
    await this.taskser.deleteTask(task)
  }
}
