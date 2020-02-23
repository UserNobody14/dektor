import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToTime'
})
export class DateToTimePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return new Date(value).getTime();
  }

}
