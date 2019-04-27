import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService} from '../storage.service';
import { Item } from '../../models/item.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidator } from  '../validators/date';
import { format, addHours, addMinutes } from 'date-fns';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  inputForm:FormGroup;
  inputText:string;
  headingText:string = "List App";
  pendingItems:Array<Item> = [];
  numberOfItems:number;

  constructor(
    private storage:StorageService,
    private formBuilder:FormBuilder,
    private alertController:AlertController,
    private localNotifications:LocalNotifications) {
  }



  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      taskName: ['',[ Validators.required, Validators.minLength(3) ]]
    });
  }

  ionViewDidEnter(){
    this.loadPendingItems();
  }

  deleteItem(id:number){
    console.log("To be deleted: " + id);
    this.storage.deleteItem(id)
    .then((response) => {
      if( response == true ){
        this.loadPendingItems();
      }
    })
    .catch( (error) => { console.log(error) });
  }

  addItem(name:string){

    this.inputText = '';
    let item:Item = {name: name, id: new Date().getTime(), status: false, dueDate: ''};
    this.presentAlertPrompt(item);


  }

  loadPendingItems(){
    this.storage.getListFromStorage()
    .then( (response:any) => {
      if(response){
        this.pendingItems = this.storage.listOfItems.filter((item)=>{
          return item.status == false;
        });
        this.numberOfItems = this.pendingItems.length;
      }
    })
    .catch( (error) => console.log(error));
  }

  sortList(){
    this.pendingItems.sort((item1,item2) => {
      return item2.id - item1.id;
    });
  }


  changeItemStatus(id:number){
    this.storage.toggleItemStatus(id)
    .then((response) => {
      if( response == true ){
        console.log("Reloading pending");
        this.loadPendingItems();
      }
    })
    .catch( (error) => { console.log(error) });
  }
  
  async presentAlertPrompt(item:Item) {
    const alert = await this.alertController.create({
      header: 'Schedule this task to be due in',
      inputs: [
        {
          name: 'hours',
          type: 'number',
          placeholder: 'Hours'
        },
        {
          name: 'minutes',
          type: 'number',
          placeholder: 'Minutes'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        },
        {
          text: 'Schedule',
          handler: (data) => {
            if(data.hours)
            {
              let dueDate = addHours( new Date(), data.hours );
              dueDate = addMinutes(dueDate, data.minutes );
              const formattedDate = format( dueDate , 'yyyy-MM-dd:HH:mm');
              item.dueDate = formattedDate;
              this.storage.addItem(item);
              this.loadPendingItems();
              this.scheduleReminder(dueDate,item.name);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  scheduleReminder( dueDate:Date , text:string ){
    //time in milliseconds
    this.localNotifications.schedule({
      text: `Remember to ${text}`,
      trigger: {at: dueDate },
      led: 'FF0000',
      sound: null
    });
  }

}
