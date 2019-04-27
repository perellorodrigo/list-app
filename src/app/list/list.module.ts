import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';
import { TimeFromNowModule } from '../timeFromNow/timeFromNow.module';



const routes: Routes = [
  {
    path: '',
    component: ListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TimeFromNowModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [ListPage]
})
export class ListPageModule {

}
