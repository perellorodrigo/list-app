import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  inputText:string;
  headingText:string = "Hello World";
  items:Array<string> = ['Bread', 'Butter', 'Nutella', 'Milk'];

  deleteItem(itemName: string){
    let index: number = this.items.indexOf(itemName);
    this.items.splice(index,1);
  }

  addItem(){
    if(this.items.indexOf(this.inputText) !== -1)
    {
      alert(this.inputText + " is already on the list");
    }else{
      this.items.push(this.inputText);
      this.inputText = "";
      alert("New item added");
    }
  }

}
