import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeInWordsPipe } from '../time-in-words.pipe';

@NgModule({
  declarations: [TimeInWordsPipe],
  imports: [
    CommonModule
  ],
  exports: [TimeInWordsPipe]
})
export class TimeInWordsModule { 
  static forRoot() {
    return {
        ngModule: TimeInWordsModule,
        providers: [],
    };
  }
}
