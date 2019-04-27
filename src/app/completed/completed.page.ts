import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Item } from 'src/models/item.model';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {

  constructor(private storage:StorageService) { }

  completedItems:Array<Item> = [];
  numberOfItems:number;

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadCompletedItems();
  }
  
  deleteItem(id:number){
    console.log("To be deleted: " + id);
    this.storage.deleteItem(id)
    .then((response) => {
      if( response == true ){
        this.loadCompletedItems();
      }
    })
    .catch( (error) => { console.log(error) });
  }


  loadCompletedItems(){
    this.storage.getListFromStorage()
    .then( (response:any) => {
      if(response){
        this.completedItems = this.storage.listOfItems.filter((item)=>{
          return item.status == true;
        });
        this.numberOfItems = this.completedItems.length;
      }
    })
    .catch( (error) => console.log(error));
  }

  changeItemStatus(id:number){
    this.storage.toggleItemStatus(id)
    .then((response) => {
      if( response == true ){
        console.log("Reloading pending");
        this.loadCompletedItems();
      }
    })
    .catch( (error) => { console.log(error) });
  }
  

}
