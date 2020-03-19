import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ImmThread } from '../../models/thread';
import {List, Set, Record} from 'immutable';
import {GetNextPage, GetPostsForThread, InlineReply, RemoveInliningForReply, ShowReplyInPost, UnShowReplyInPost} from './thread.actions';
import { ThreadService } from '../../services/thread.service';
import { tap } from 'rxjs/operators';
import {ImmPost} from '../../models/post';
import {isNull, isUndefined} from 'util';
import {Observable} from 'rxjs';


function findPostIndex(posts: List<ImmPost>, n: number) {
  return posts.findIndex(a => a.get('number') === n);
}
function mustNotBeNull(item: number) {
  if(item === null || item === undefined) {
    throw Error;
  }
}
// function findInlined(posts: List<ImmPost>, n: number) {
//   const allPosts: List<ImmPost> = posts.flatMap(pp => pp.get('replyPosts'));
//   const relevantPostIndex = findPostIndex(allPosts, n);
//   const relevantPost = allPosts.get(relevantPostIndex);
//   return relevantPost;
// }
// function findInlinePath(posts: List<ImmPost>, n: number) {
//   const indexOfItem = posts.findIndex(post => post.replyPosts.map(a => a.number).includes(n));
//   return [indexOfItem, 'replyPosts', findPostIndex(posts.get(indexOfItem).replyPosts, n)];
// }

export interface ThreadStateModel {
  thread: ImmThread;
  pageNumber: number;
  alreadyInlinedPosts: Set<number>;
}
// const threadStateModelRecord = Record<>({})

@State<ThreadStateModel>({
    name: 'thread',
    defaults: {
      thread: new ImmThread({}),
      pageNumber: 0,
      alreadyInlinedPosts: Set([])
    }
})
export class ThreadState {

    constructor(private threadService: ThreadService) { }

    @Selector()
    public static getState(state: ThreadStateModel) {
        return state;
    }
    @Selector()
    public static posts(state: ThreadStateModel) {
        return state.thread.get('posts');
    }
    @Selector()
    public static inlined(state: ThreadStateModel) {
      return state.alreadyInlinedPosts;
    }
    @Selector()
    public static findPosts(state: ThreadStateModel) {
      return (a: number) => {
        // console.log('foundin a: ',  a);
        return state.thread.get('posts').find(b => b.get('number') === a);
      };
    }
    @Selector()
    public static findInline(state: ThreadStateModel): (a: Set<number>) => List<ImmPost> {
      return (a: Set<number>) => {
        if (isUndefined(a) || isNull(a)) {
          return List<ImmPost>([]);
        }
        return state.thread.get('posts').filter(aa => a.has(aa.number)).sortBy(qq => qq.number);
      };
    }
    @Action(GetPostsForThread)
    getThread({patchState}: StateContext<ThreadStateModel>, {payload}: GetPostsForThread) {
        return this.threadService.getThreadsHttp(payload).pipe(
          tap(thread => {
            // console.log(thread.get('posts').map(a => a.getName).toArray());
            patchState({ thread });
          })
        );
    }
    @Action(InlineReply)
  inlineReply(
      {patchState, getState}: StateContext<ThreadStateModel>,
      {post, reply}: InlineReply
    ) {
      const thread = getState().thread;
      const newInliningForPosts = getState().alreadyInlinedPosts;
      const postList = thread.get('posts');
      const postIndex = findPostIndex(postList, post); //  postList.findIndex(a => a.get('number') === post);
      const relevantPost = postList.get(postIndex);
      const withoutReply = postList.map(a => a.set('inlinedPosts', a.inlinedPosts.remove(reply)));
      const reSortNumbers = withoutReply.set(postIndex, relevantPost.set('inlinedPosts', relevantPost.inlinedPosts.add(reply)));
      patchState({thread: thread.set('posts', reSortNumbers),
        alreadyInlinedPosts: newInliningForPosts.add(reply)});
    }
  @Action(RemoveInliningForReply)
  removeInliningForReply(
    {patchState, getState}: StateContext<ThreadStateModel>,
    {post, reply}: RemoveInliningForReply
  ) {
    const st = getState();
    const thread = st.thread;
    const newInliningForPosts = st.alreadyInlinedPosts;
    const postList = thread.get('posts');
    const postIndex = findPostIndex(postList, post); //  postList.findIndex(a => a.get('number') === post);
    const relevantPost = postList.get(postIndex);
    const withoutReply = postList.map(a => a.set('inlinedPosts', a.inlinedPosts.remove(reply)));
    // const reSortNumbers = withoutReply.set(postIndex, relevantPost.set('inlinedPosts', relevantPost.inlinedPosts.add(reply)))
    patchState({thread: thread.set('posts', withoutReply),
      alreadyInlinedPosts: newInliningForPosts.remove(reply)});

  }

//  For Paging:
  @Action(GetNextPage)
  getNextPage(
    {patchState, getState}: StateContext<ThreadStateModel>,
    { payload }: GetNextPage
  ) {
      const st = getState();
      const page = st.pageNumber;
      //if the threadnumber in the payload is different, reset;
      // edge cases: st.thread.number is null
      //pageNumber is null
      //payload is null
      //a combination of these.
      const currentThread = st.thread.number;
      const threadNumber = payload ? payload : currentThread;
      mustNotBeNull(threadNumber);
      const pageNumber = payload ?
      payload !== currentThread ? 0 : page + 1 : page + 1;

      return this.threadService.getThreadsHttp(threadNumber).pipe(
        tap(thread => {
          patchState({thread, pageNumber});
        })
      );
  }

}
