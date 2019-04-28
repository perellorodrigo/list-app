import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, addSeconds } from 'date-fns';
@Pipe({
  name: 'timeInWords'
})
export class TimeInWordsPipe implements PipeTransform {

  transform(timeInSeconds:number): any {

    var options = {
      addSuffix: false,
      includeSeconds: true
    }

    

    let message = formatDistance(
      addSeconds(0,timeInSeconds),
      0,
      options
    )

      return message;
  }

}
