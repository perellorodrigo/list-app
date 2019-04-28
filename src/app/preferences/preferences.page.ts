import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { NotificationPreference } from 'src/models/notification.model';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

  notificationForm:FormGroup;
  notificationsList:Array<NotificationPreference>;

  constructor(
    private alertController:AlertController,
    private formBuilder:FormBuilder,
    private storage:StorageService ) { }

  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
      time: ['', [ Validators.required, ]],
      unit: ['', [ Validators.required]],
      when: ['', [ Validators.required]],
      message: ['', [ Validators.minLength(5)]]
    });
  }

  ionViewDidEnter(){
    this.loadNotificationPreferences();
  }

  loadNotificationPreferences(){
    this.storage.getNotificationsFromStorage()
    .then( (response:any) => {
      if(response){
        this.notificationsList = this.storage.listOfNotifications;
      }
    })
    .catch( (error) => console.log(error));
  }

  addNotification(formData:any){
    let time = formData.time;
    
    if (formData.unit == 'hours')
    {
      time *= 3600;
    }
    else if (formData.unit == 'minutes'){
      time *= 60;
    }
    let triggerBefore = false;
    let triggerAfter  = false;

    if (Array.isArray(formData.when))
    {
      
      if (formData.when.includes('before') )
        triggerBefore = true;
      if ( formData.when.includes('after') )
        triggerAfter = true;
    }
    let message = formData.message;

    if(message == '')
      message = 'Please remember to ';
    


    let notificationPreference:NotificationPreference = {
      id: new Date().getTime(),
      isEnabled: true,
      triggerIn: time,
      triggerBefore: triggerBefore,
      triggerAfter: triggerAfter,
      message: message
    };

    this.storage.addNewNotification(notificationPreference);
    this.notificationForm.reset()
    this.loadNotificationPreferences();
  }

  changeNotificationStatus(id:number){
    this.storage.toggleNotification(id)
    .then((response) => {
      if( response == true ){
        this.loadNotificationPreferences();
      }
    })
    .catch( (error) => { console.log(error) });

  }

  deleteNotification(id:number){
    this.storage.deleteNotification(id)
    .then((response) => {
      if( response == true ){
        this.loadNotificationPreferences();
      }
    })
    .catch( (error) => { console.log(error) });
  }




}
