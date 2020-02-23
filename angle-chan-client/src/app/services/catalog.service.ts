// import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ImmThread} from '../models/thread';
import {List} from 'immutable';
import {ImmPost} from '../models/post';
import {ImmMediaInfo} from '../models/media-container';
const immPostGenericTest = (text, threadNumber) => {
  return {
    text,
    number: threadNumber,
    date: new Date().toISOString(),
    utc: new Date().toUTCString()
  };
};

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getThreadsForBoard(board: string) {
    return this.http.get('/api/board/' + board);
  }
  testGetThreadsForBoard(board: string): Observable<List<ImmThread>> {
    const testMedia = new ImmMediaInfo({
      info: {link: 3, width: 85, height: 120, contentLength: 0},
      thumbnail: {link: 3, width: 85, height: 120, contentLen: 0},
      title: 'My image.jpg',
      mediaSizeKb: '1.1 Mb'
    });
    const opost =  new ImmPost({
      ...immPostGenericTest('my thread op', 111),
      media: List([testMedia])
    });
    const morePosts = [
      new ImmPost({name: 'v' , ...immPostGenericTest('my reply', 222)}),
      new ImmPost({...immPostGenericTest('my reply2', 333), media: List([testMedia])})
    ];
    console.log('here service');
    return of(List([
      new ImmThread({
        // originalPost: opost,
        subject: 'my original thread!',
        number: 11,
        posts: List([opost, ...morePosts])
      })
    ]));
  }

}
