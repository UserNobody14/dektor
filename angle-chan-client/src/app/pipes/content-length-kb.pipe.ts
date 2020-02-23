import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentLengthKb'
})
export class ContentLengthKbPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    console.log('val', value);
    console.log('floor:', Math.floor(value / 1000))
    return value < 1000 ? `${value} bytes` :
      value < 1000000 ?  `${Math.floor(value / 1000)} kb` :
        `${value / 1000000} Mb`;
  }

}
