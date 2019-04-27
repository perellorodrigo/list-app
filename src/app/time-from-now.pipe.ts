import { Pipe, PipeTransform } from '@angular/core';
import { format, parse, formatDistance } from 'date-fns';

@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {
  date:Date;
  transform(dateStr:string, prefix:string): any {
    if (dateStr == null)
      return 'No ' + prefix + ' Date';

    this.date = parse(dateStr, 'yyyy-MM-dd:HH:mm:ss', new Date());

    var options = {
      addSuffix: true,
      includeSeconds: true
    }

    let message = formatDistance(
      this.date,
      new Date(),
      options
    )
  
    return prefix + ' ' + message;

  }

}

