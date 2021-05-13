import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({ providedIn: "root" })
export class AlertService{
    constructor(private alert:AlertController){

    }
    async msg(header:string,message:string){
        const alert = this.alert.create({
            header,message,
            buttons:["ok"]
        })
        ;(await alert).present()
    }

}