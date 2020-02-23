import { Pipe, PipeTransform } from '@angular/core';
import {Post} from '../models/post';
import {List} from 'immutable';
import {isNull, isUndefined} from 'util';

@Pipe({
  name: 'postNumbers'
})
export class PostNumbersPipe implements PipeTransform {

  transform(value: List<Post>, ...args: any[]): List<number> {
    if (isNull(value) || isUndefined(value)) {
      return List([]);
    } else {
      return value.map((post) => post.number);
    }
  }

}
