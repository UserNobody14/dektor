import { Post } from '../../models/post';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { List, Set } from 'immutable';
import { ImmPost } from '../../models/post';
import { Select, Store } from '@ngxs/store';
import { ThreadState } from '../../state/thread/thread.state';
import {Observable, throwError} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {GetNextPage, GetPostsForThread} from '../../state/thread/thread.actions';
import {ThreadNotFound} from '../../models/thread';


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
  @Select(ThreadState.inlined) inlined$: Observable<Set<number>>;
  @Select(ThreadState.exceptionHandler) notFound: Observable<ThreadNotFound>;

  thread: string;
  // TODO: make the board a selection from the store?
  board: string;

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.thread = null;
      this.thread = data.get('number');
      this.board = data.get('board');
      console.log('fetching posts for threadnum: ', this.thread);
      console.log('fetching posts for board: ', this.board);
      if (this.thread) {
        this.store.dispatch(new GetNextPage(this.board, Number(this.thread)));
      }
    });
  }

}
