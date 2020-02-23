import { Post } from './../models/post';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { List, Set } from 'immutable';
import { ImmPost } from '../models/post';
import { Select, Store } from '@ngxs/store';
import { ThreadState } from '../state/thread/thread.state';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GetPostsForThread } from '../state/thread/thread.actions';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadComponent implements OnInit {
  // @Input()
  // threadPosts: List<ImmPost>;
  @Select(ThreadState.posts) posts$: Observable<List<ImmPost>>;
  @Select(ThreadState.inlined) inlined$: Observable<Set<number>>

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      console.log('fetching posts for threadnum: ', data.get('number'));
      if (data.get('number')) {
        this.store.dispatch(new GetPostsForThread(Number(data.get('number'))));
      }

    });
  }

}
