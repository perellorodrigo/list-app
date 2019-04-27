import { Pipe, PipeTransform } from '@angular/core';
import { format, parse, formatDistance } from 'date-fns';

@Pipe({
  name: 'dueIn'
})
export class DueInPipe implements PipeTransform {
  date:Date;

  transform(dueDate:string): any {
    //const formattedDate = format( dueDate , 'yyyy-MM-dd:HH:mm');
    if (dueDate == null)
      return 'No Due Date';

    this.date = parse(dueDate, 'yyyy-MM-dd:HH:mm', new Date());

    let message = formatDistance(
      this.date,
      new Date(),
      { addSuffix: true }
    )

    return 'Due ' + message;
  }

}
