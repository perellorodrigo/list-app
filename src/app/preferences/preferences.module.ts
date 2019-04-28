import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreferencesPage } from './preferences.page';
import { TimeInWordsModule } from '../timeInWords/timeInWords.module';

const routes: Routes = [
  {
    path: '',
    component: PreferencesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TimeInWordsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [PreferencesPage]
})
export class PreferencesPageModule {}
