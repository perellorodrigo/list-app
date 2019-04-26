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

  items:Array<Item> = [];
  numberOfItems:number;

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

}
