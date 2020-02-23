import { Pipe, PipeTransform } from '@angular/core';
import {List, Set} from 'immutable';

@Pipe({
  name: 'containsNumber'
})
export class ContainsNumberPipe implements PipeTransform {

  transform(value: List<number> | Set<number>, item: number): boolean {
    // if (typeof value === 'List<number>') {
    //
    // }
    return value.includes(item);
  }

}
