import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompletedPage } from './completed.page';
import { TimeFromNowModule } from '../timeFromNow/timeFromNow.module';

const routes: Routes = [
  {
    path: '',
    component: CompletedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeFromNowModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [CompletedPage]
})
export class CompletedPageModule {}
