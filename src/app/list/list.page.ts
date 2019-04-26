import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { StorageService} from '../storage.service';
import { Item } from '../../models/item.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidator } from  '../validators/date';



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
    private formBuilder:FormBuilder) {
  }



  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      taskName: ['',[ Validators.required, Validators.minLength(3) ]],
      dueDate: ['',[ Validators.required, DateValidator.isValid]]
    });
  }

  ionViewDidEnter(){
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

  deleteItem(id:number){
    //let index = this.pendingItems.findIndex((item) => item.id == id);
    //console.log(index);
    //this.items.splice(index, 1);
    //this.numberOfItems = this.items.length;
    //this.saveList();
    console.log("To be deleted: " + id);
    



  }

  saveList(){
    this.storage.saveData('list', this.pendingItems )
    .then((response) => {
      //data written successfully
      console.log("Saved successfully");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  sortList(){
    this.pendingItems.sort((item1,item2) => {
      return item2.id - item1.id;
    });
  }
  
  addItem(name:string, dueDate:string){

      this.inputText = '';
      let item = {name: name, id: new Date().getTime(), status: false, dueDate: dueDate};



      //this.items.push( item );
      //this.numberOfItems = this.items.length;
      //this.saveList();
      //*/
  }

  changeItemStatus(id:number){
    /*
    this.items.forEach((item) => {
      if(item.id == id){
        item.status
      }
    });
    */



  }
  

}
