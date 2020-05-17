import { Post } from '../../models/post';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import {InlineReply, RemoveInliningForReply, ShowReplyInPost, UnShowReplyInPost} from '../../state/thread/thread.actions';
import { ImmPost } from '../../models/post';
import { ThreadState } from '../../state/thread/thread.state';
import { map, tap } from 'rxjs/operators';
import {List, Set} from 'immutable';
import {Observable} from 'rxjs';
import {OnChange} from 'property-watch-decorator';
import {isNull, isUndefined} from 'util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  @Input() isOp: boolean;
  @OnChange<Set<number>>(function(this: PostComponent, newItem: Set<number>, change) {
    // console.log('extra', newItem, change)
    if (change.previousValue === undefined || newItem !== change.previousValue) {
      this.reSubscribe(newItem);
    }
  })
  @Input() inlining: Set<number>;
  @Input() post: ImmPost = new ImmPost({});
  inlinedPosts$: Observable<List<ImmPost>>;



  baseUrl = 'api/';
  // baseUrl = 'http://localhost:8080';

  constructor(private store: Store) {
    // const isInline = isUndefined(this.post.inlinedPosts) || isNull(this.post.inlinedPosts)
    this.inlinedPosts$ = this.store.select(ThreadState.findInline)
      .pipe(map(inline => inline(this.post.inlinedPosts)));
  }
  reSubscribe(inPosts) {
    this.inlinedPosts$ = this.store.select(ThreadState.findInline)
      .pipe(map(inline => inline(inPosts)));
  }

  ngOnInit() {
  }
  addPost(n: number) {
    const p = this.post.get('number');
    // const showOrUnshowInPost = poster.map((eachPost) => eachPost.number);
    // console.log(p, n);
    // console.log('item: ', showOrUnshowInPost.includes(n));
    // console.log(this.post.replyPosts.find(a => a.get('number') === n));
    if (!this.post.inlinedPosts.has(n)) {
      this.store.dispatch(new InlineReply(p, n));
    } else {
      this.store.dispatch(new RemoveInliningForReply(p, n));
    }
  }

  findPostForReply(popover, postnum: number, openOrClose: boolean) {
    // console.log(postnum);
    const item = this.store.selectOnce(ThreadState.findPosts).pipe(
      map(a => a(postnum))
      // tap(a => console.log('post: ', a.toJS()))
      );
    // if (openOrClose) {

    // subItem.subscribe(a => {
    //   console.log('a =', a.toJS());
    //   if (a != null) {
    //       popover.open(a, postnum);
    //     }
    //   }, err => {
    //     console.error(err);
    //   });
    // } else {
    //   popover.close();
    // }
    if (openOrClose) {
      popover.open({item, postnum});
    } else {
      popover.close();
    }
  }

}
