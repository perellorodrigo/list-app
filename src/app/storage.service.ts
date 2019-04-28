import { Injectable } from '@angular/core';
import { Item } from 'src/models/item.model';
import { Observable, from } from 'rxjs';
import { format, parse, subSeconds, isAfter, addSeconds } from 'date-fns';
import { NotificationPreference } from 'src/models/notification.model';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';




@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public listOfItems:Array<Item> = [];
  public listOfItems$:Observable<Item>;
  public listOfNotifications:Array<NotificationPreference> = [];

  notificationsStorageKey:string = 'notifications';
  listStorageKey:string = 'items';
  

  constructor( private localNotifications:LocalNotifications) {
    this.getListFromStorage()
    .then( (data:Array<Item>) =>{
      this.listOfItems   = data;
      this.listOfItems$  = from(data);
    })
    .catch( (error) => {
      console.log(error);
    });
    this.getNotificationsFromStorage()
    .then( (data:Array<NotificationPreference>) =>{
      this.listOfNotifications = data;
      this.setupNotifications();
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  setupNotifications(){
    // Set up the notifications after cancelling all others
    // Avoid duplicates
    this.localNotifications.cancelAll().finally(() => {
      let enabledNotifications = this.listOfNotifications.filter( (notification) => { return notification.isEnabled == true } );
      let pendingItems = this.listOfItems.filter( (item) => { return item.status == false && item.dueDate != null} );
      let notificationCounter = 0;

      enabledNotifications.forEach(( notification ) => {
        pendingItems.forEach((item) => {
          if (notification.triggerBefore)
          {
            let triggerDate = parse(item.dueDate, 'yyyy-MM-dd:HH:mm:ss', new Date());
            triggerDate = subSeconds(triggerDate,notification.triggerIn);   //Subtract the triggerIn from the date
            if (isAfter(triggerDate,new Date()))                            // If the date is in the future. Setup the new notification
            {
              this.localNotifications.schedule({
                id: notificationCounter++,
                text: notification.message + ': '+ item.name,
                trigger: {at: triggerDate },
                led: 'FF0000',
                sound: null
              });
            }
            else{
              console.log("Cannot setup past notification");
            }
          }
          if (notification.triggerAfter){
            let triggerDate = parse(item.dueDate, 'yyyy-MM-dd:HH:mm:ss', new Date());
            triggerDate = addSeconds(triggerDate,notification.triggerIn);   // Add the triggerIn from the date
            if (isAfter(triggerDate,new Date()))                            // If the date is in the future. Setup the new notification
            {
              this.localNotifications.schedule({
                id: notificationCounter++,
                text: notification.message + ': '+ item.name,
                trigger: {at: triggerDate },
                led: 'FF0000',
                sound: null
              });
            }
            else{
              console.log("Cannot setup past notification");
            }
          }
        })
      });
  });

  }

  getListFromStorage(){
    return new Promise( (resolve,reject) => {
      try{
        let data:Array<Item> = JSON.parse( localStorage.getItem( this.listStorageKey ) );
        if( data ){
          this.listOfItems = data;
          resolve( data );
        }
        else{
          throw('no data for the requested key');
        }
      }
      catch( error ){
        reject( error );
      }
    });
  }

  getNotificationsFromStorage(){
    return new Promise( (resolve,reject) => {
      try{
        let data:Array<NotificationPreference> = JSON.parse( localStorage.getItem( this.notificationsStorageKey ) );
        if( data ){
          this.listOfNotifications = data;
          resolve( data );
        }
        else{
          throw('no data for the requested key');
        }
      }
      catch( error ){
        reject( error );
      }
    });
  }

  saveNotificationsInStorage(){
    return new Promise( (resolve,reject) => {
      try{
        localStorage.setItem( this.notificationsStorageKey , JSON.stringify(this.listOfNotifications) );
        if( localStorage.getItem( this.notificationsStorageKey ) ){
          //data can be read, so resolve true
          resolve( true );
        }
        else{
          throw('data write failed');
        }
      }
      catch(error){
        reject( error );
      }
    });
  }

  addNewNotification( notification:NotificationPreference){
    this.listOfNotifications.push( notification );
    this.saveNotificationsInStorage();
    this.setupNotifications();
  }

  deleteNotification( id:number ){
    return new Promise( ( resolve , reject)  => {
      this.listOfNotifications.forEach( ( notification, index ) => {
        if( notification.id == id ){
          this.listOfNotifications.splice( index, 1 );
          this.saveNotificationsInStorage().finally(()=>{
            this.setupNotifications();
          });
          resolve( true );
        }
      });
      reject( new Error('item not found') );
    });
  }


  addItem( item:Item ){
    this.listOfItems.push( item );
    this.saveListInStorage().finally(() => {
      this.setupNotifications();
    });
    
  }

  saveListInStorage(){
    return new Promise( (resolve,reject) => {
      try{
        localStorage.setItem( this.listStorageKey , JSON.stringify(this.listOfItems) );
        if( localStorage.getItem( this.listStorageKey ) ){
          //data can be read, so resolve true
          resolve( true );
        }
        else{
          throw('data write failed');
        }
      }
      catch(error){
        reject( error );
      }
    });
  }

  deleteItem( id:number ){
    return new Promise( ( resolve , reject)  => {
      this.listOfItems.forEach( ( item, index ) => {
        if( item.id == id ){
          this.listOfItems.splice( index, 1 );
          this.saveListInStorage();
          resolve( true );
        }
      });
      reject( new Error('item not found') );
    });
  }

  toggleNotification( id:number ){
    return new Promise( (resolve , reject) => {
      this.listOfNotifications.forEach( ( notification, index ) => {
        if( notification.id == id ){
          notification.isEnabled = !notification.isEnabled;
          this.saveNotificationsInStorage().finally(() => {
            this.setupNotifications();
          });
          resolve(true);
          return;
        }
      });
      this.saveNotificationsInStorage();
      resolve(false);
    });
  }

  toggleItemStatus( id:number ){
    return new Promise( (resolve , reject) => {
      this.listOfItems.forEach( ( item, index ) => {
        if( item.id == id ){
          if( item.status == false ){
            item.status = true;
            const formattedDate = format( new Date() , 'yyyy-MM-dd:HH:mm:ss');
            item.doneDate = formattedDate;
          }
          else{
            item.status = false;
            item.doneDate = null;
          }
          this.saveListInStorage().finally(() => {
            this.setupNotifications();
          });
          resolve(true);
          return;
        }
      });
      this.saveListInStorage();
      resolve(false);
    });
  }


  
}
