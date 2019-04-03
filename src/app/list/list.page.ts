import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { StorageService} from '../storage.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(private storage:StorageService) {
  }



  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.readData('list')
    .then( (response:any) => {
      if(response){
        this.items = JSON.parse(response);
        this.numberOfItems = this.items.length;
      }
    })
    .catch( (error) => console.log(error));
  }

  inputText:string;
  headingText:string = "List App";
  items:Array<Item> = [];
  numberOfItems:number;

  deleteItem(id:number){
    let index = this.items.findIndex((item) => item.id == id);
    this.items.splice(index, 1);
    this.numberOfItems = this.items.length;
    this.saveList();
  }

  saveList(){
    this.storage.saveData('list', this.items )
    .then((response) => {
      //data written successfully
      console.log("Saved successfully");
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  addItem(name:string){
    
      this.inputText = '';
      let item = {name: name, id: new Date().getTime(), status: false };
      this.items.push( item );
      this.numberOfItems = this.items.length;
      this.saveList();
  }

  changeItemStatus(id:number){
    this.items.forEach((item) => {
      if(item.id == id){
        item.status
      }
    });
  }
  

}
