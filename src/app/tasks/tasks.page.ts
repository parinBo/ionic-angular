import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/Alert.service';
import { Task } from './Tasks';
import { TaskServices } from './tasks.service';
export interface Item { name: string; }

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  amount:number=0
  tasks:Task[]=[]
  constructor(private taskSer:TaskServices,private alert:AlertService) {
   
   }

  ngOnInit() {
    this.taskSer.getAllTasks()
    this.taskSer.getAllTaskUpdate().subscribe(data=>{
      this.addIcon(data)
    })
  }
 
  onAdd(e,data:Task){
    if(data.limit==0){
      this.alert.msg("Fail!","Cannot add data")
    }else{
      this.taskSer.addTask(data)
      this.amount++
    }
  }

  addIcon(task){
    task.forEach(element => {
      let id = element.id.substr(0,element.id.indexOf("-"))
      element.icon =  "/assets/icon/"+id+".svg";
    });
    this.tasks = task
  }
 
}
