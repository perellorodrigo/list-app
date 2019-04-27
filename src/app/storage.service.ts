import { Injectable } from '@angular/core';
import { Item } from 'src/models/item.model';
import { Observable, from } from 'rxjs';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public listOfItems:Array<Item> = [];
  public listOfItems$:Observable<Item>;
  listStorageKey:string = 'items';
  

  constructor() {
    this.getListFromStorage()
    .then( (data:Array<Item>) =>{
      this.listOfItems   = data;
      this.listOfItems$  = from(data);
    })
    .catch( (error) => {
      console.log(error);
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

  addItem( item:Item ){
    this.listOfItems.push( item );
    this.saveListInStorage();
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
          this.saveListInStorage();
          resolve(true);
          return;
        }
      });
      this.saveListInStorage();
      resolve(false);
    });
  }

  /*
  saveData(key, value){
    return new Promise((resolve,reject) => {
      window.localStorage.setItem( key, JSON.stringify(value) );
      if ( window.localStorage.getItem(key)){
        resolve( true );
      }else{
        reject(false);
      }
    });
  }*/

  /*
  readData( key ){
    return new Promise((resolve, reject) => {
      try{
        let data = window.localStorage.getItem( key );
        if( data ){
          resolve( data );
        }
        else{
          throw('No data')
        }
      }
      catch( exception ){
        reject( exception );
      }
    });
  }*/


  
}
