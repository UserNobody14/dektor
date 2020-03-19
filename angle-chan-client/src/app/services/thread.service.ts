import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { List } from 'immutable';
import { ImmPost } from '../models/post';
import {ImmThread, InputThread, Thread} from '../models/thread';
import {ImmMediaInfo} from '../models/media-container';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  // TODO: add paged thread service
  // TODO: modify everything else to work with paged thread service.
  // TODO: add test services?
  // TODO: adjust to gradle?
  // TODO: get actually running on web?
  // TODO: figure out multiple image upload issue.

  constructor(private http: HttpClient) { }

  getThreadsHttp(thread: number): Observable<ImmThread> {
    return this.http.get<InputThread>('/api/thread/' + thread).pipe(
      map((each: InputThread) => {
        const newEach: any = each;
        newEach.posts = List(each.posts).map(a => new ImmPost(a));
        console.log('new each', newEach);
        return newEach;
      }),
      map(data => new ImmThread(data)),
      tap(item => console.log('thr', item.toJS(), item.posts.map(a => a.toJS()).toJS()))
    );
  }

  getPosts() {
    return List([new ImmPost({name: 'vv',
    text: '',
  number: 0,
  // date: '',
  replies: [],
  replyingTo: []})]);
  }
  getPostsObservable(): Observable<List<ImmPost>> {
    return of(this.getPosts());
  }
  getThread(): Observable<ImmThread> {
    return of(new ImmThread({posts: this.getPosts()}));
  }
  private immPostGenericTest = (text, threadNumber) => {
    return {
     text,
      number: threadNumber,
      date: new Date().toISOString(),
      utc: new Date().toUTCString()
  };
  }
  getThreadForThreadNum(threadNumber: number): Observable<ImmThread> {
    const testMedia = List([new ImmMediaInfo({
      info: {link: 3, width: 85, height: 120, contentLength: 0},
      thumbnail: {link: 3, width: 85, height: 120, contentLen: 0},
      title: 'My image.jpg',
      mediaSizeKb: '1.1 Mb'
    })]);
    return of(new ImmThread({posts: List([
      new ImmPost({
        name: 'v' + threadNumber,
        ...this.immPostGenericTest('my post', 111),
        replies: [222, 333]}),
      new ImmPost({name: 'v' + threadNumber, ...this.immPostGenericTest('my reply', 222)}),
      new ImmPost({...this.immPostGenericTest('my reply2', 333), media: testMedia}),
      new ImmPost({...this.immPostGenericTest('my reply3', 444), replies: [222, 333]})
    ])}));
  }
}
