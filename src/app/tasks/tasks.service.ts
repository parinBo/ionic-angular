import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, Observer, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Task } from "./Tasks";
@Injectable({providedIn:"root"})
export class TaskServices{
    Thetasks:Task[]=[
        {name:"ตักน้ำแข็ง (2ถุง)",id:"icebag-1",rate:10,limit:1},
        {name:"ตักน้ำแข็ง (ต่อกระติก)",id:"icebox-3",rate:5,limit:3},
        {name:"กวาดบ้าน",id:"sweep-2",rate:5,limit:2},
        {name:"อ่านหนังสือ/ทำแบบฝึกหัด",id:"int",rate:30,limit:1},
        {name:"เตรียมโต๊ะกินข้าว",id:"prepare-2",rate:10,limit:2},
        {name:"เช็ดโต๊ะกินข้าว",id:"cleantable-2",rate:5,limit:2},
        {name:"ทิ้งขยะ (วัน)",id:"garbage-1",rate:30,limit:1},
        {name:"ช่วยแม่ทำงาน (วัน)",id:"helpmom-1",rate:20,limit:1},
        {name:"ขายของ (วัน)",id:"sell-1",rate:15,limit:1},
        {name:"ให้อาหารหมา",id:"feed-2",rate:10,limit:2},
        {name:"ล้างจาน",id:"cleandish-2",rate:15,limit:2},
        {name:"ปิดบ้าน",id:"closehome-1",rate:5,limit:1},
        {name:"แช่ของ",id:"fillshelf-2",rate:10,limit:2},
        {name:"ทิ้งขยะ",id:"cleantable-2",rate:15,limit:2},
      ]
    private uId:string
    private rate:number=0
    private rateSub = new Subject<Number>()
    private taskSub= new Subject<Task[]>()
    private taskAllSub= new Subject<Task[]>()
    private tasksCollections:AngularFirestoreCollection<Task>;
    private allTasksCollections:AngularFirestoreCollection<Task>;
    constructor(private afs:AngularFirestore,private auth:AngularFireAuth){
        this.auth.user.subscribe(i=>{
            this.uId=i.uid
            this.tasksCollections = afs.doc("Task/"+this.uId).collection("data")
            this.allTasksCollections = afs.doc("Task/"+this.uId).collection("allData")
        })
    }
   
    addTask(task:Task){
        this.tasksCollections.doc(task.id).set(task)
        task.limit--;
        this.changeAllTask(task)
    }
    getAllTasks(){
        let num:number =1
        this.auth.user.subscribe(i=>{
            this.uId=i.uid
            let dataCollection = this.afs.doc("Task/"+i.uid).collection<Task>("allData")
            dataCollection.snapshotChanges().subscribe(data=>{
                if(data.length==0){
                    console.log("have not data")
                    this.Thetasks.map(data=>{
                        dataCollection.doc(data.id).set(data)
                    })
                }else{
                    dataCollection.valueChanges().pipe(map(data=>{
                        return data.map(task=>{
                            return task
                        })
                    })).subscribe(res=>{
                        this.taskAllSub.next(res)
                    })
                    console.log("havedata")
                }
            })
        })
    }

    getTask(){
        this.tasksCollections.valueChanges().pipe(map(data=>{
            this.rate=0
            return data.map(task=>{
                this.rate += task.rate
                return task
            })
        })).subscribe((res)=>{
            this.rateSub.next(this.rate)
            this.taskSub.next(res)
        })
    }
    getTaskUpdate(){
        return this.taskSub
    }
    getAllTaskUpdate(){
        return this.taskAllSub
    }

    getRateUpdate(){
        return this.rateSub
    }
    async deleteTask(task:Task){
        await this.tasksCollections.doc(task.id).delete()
        this.allTasksCollections.valueChanges().pipe(map(data=>{
            return data.find(d=>d.name==task.name)
        })).subscribe(data=>{
            data.limit++;
            this.changeAllTask(data)

        })
    }
    
    changeAllTask(task:Task){
        let oldId = task.id
        let id = task.id.substr(0,task.id.indexOf("-"))
        task.id=`${id}-${task.limit}`
        this.allTasksCollections.doc(oldId).delete()
        this.allTasksCollections.doc(task.id).set({name:task.name,id:task.id,limit:task.limit,rate:task.rate})
    }
   
}