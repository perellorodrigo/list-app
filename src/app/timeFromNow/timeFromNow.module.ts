import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFromNowPipe } from '../time-from-now.pipe';


// This module is to allow the pipe to be imported into modules
@NgModule({
  declarations: [TimeFromNowPipe],
  imports: [
    CommonModule
  ],
  exports: [TimeFromNowPipe]
})
export class TimeFromNowModule { 
  static forRoot() {
    return {
        ngModule: TimeFromNowModule,
        providers: [],
    };
  }
}
