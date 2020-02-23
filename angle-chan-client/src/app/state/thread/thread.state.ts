import { State, Selector, Action, StateContext } from '@ngxs/store';
import { ImmThread } from '../../models/thread';
import {List, Set, Record} from 'immutable';
import {GetPostsForThread, InlineReply, RemoveInliningForReply, ShowReplyInPost, UnShowReplyInPost} from './thread.actions';
import { ThreadService } from '../../services/thread.service';
import { tap } from 'rxjs/operators';
import {ImmPost} from '../../models/post';
import {isNull, isUndefined} from 'util';
import {Observable} from 'rxjs';

function findPostIndex(posts: List<ImmPost>, n: number) {
  return posts.findIndex(a => a.get('number') === n);
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
    // @Action(ShowReplyInPost)
    // showReplyInPost({patchState, getState}: StateContext<ThreadStateModel>, {post, reply}: ShowReplyInPost) {
    //   const thread = getState().thread;
    //   const inline = getState().alreadyInlinedPosts;
    //   console.log('post: ' + post, 'reply: ' + reply);
    //   const postList = thread.get('posts');
    //   const postIndex = findPostIndex(postList, post); // postList.findIndex(a => a.get('number') === post);
    //   const relevantPost = postList.get(postIndex);
    //   const replyIndex = findPostIndex(postList, reply); // postList.findIndex(a => a.get('number') === reply);
    //   const relevantReply = !inline.has(reply) ? postList.get(replyIndex) : findInlined(postList, reply);
    //   const removalPath = findInlinePath(postList, reply);
    //   console.log('removalPath: ', removalPath);
    //   // console.log('get in:' postList.g)
    //   const withRemovedReply = replyIndex !== -1 ?
    //     postList.remove(replyIndex) : inline.has(reply) ? postList.removeIn(removalPath) : postList;
    //   console.log('withRemoved reply', withRemovedReply.toJS(), 'member of', inline.has(reply), 'member of', replyIndex);
    //   // const oldReplies = relevantPost.get('replyPosts');
    //   // const newReplies = oldReplies.push(relevantReply);
    //   // console.log('old: ', oldReplies.toJS(), 'new', newReplies.toJS());
    //   console.log(relevantReply.toJS());
    //   const insertionPost = replyIndex !== -1 ?
    //     relevantPost.set('replyPosts', relevantPost.get('replyPosts').push(relevantReply)) :
    //     inline.has(reply) ?
    //     relevantPost.set('replyPosts', relevantPost.get('replyPosts').push(relevantReply)) : relevantPost;
    //   console.log('insertion Post: ', insertionPost.toJS());
    //   // postIndex = postList.findIndex(a => a.get('number') === post);
    //   const newpostIndex = findPostIndex(withRemovedReply, post); // withRemovedReply.findIndex(a => a.get('number') === post);
    //   const withInsertedReplyPost = withRemovedReply.set(newpostIndex, insertionPost);
    //   console.log(thread.toJS(), postList.toJS(), 'index: ' + postIndex);
    //   console.log(`for post: ${post} adding reply: ${reply}`);
    //   console.log('with inserted reply post', withInsertedReplyPost.toJS(), 'index' , newpostIndex);
    //   patchState({thread: thread.set('posts', withInsertedReplyPost),
    //   alreadyInlinedPosts: inline.add(reply)});
    // }
    // @Action(UnShowReplyInPost)
    // unShowReplyInPost(
    //   {patchState, getState}: StateContext<ThreadStateModel>,
    //   {post, reply}: UnShowReplyInPost) {
    //   const thread = getState().thread;
    //   const newInliningForPosts = getState().alreadyInlinedPosts;
    //   const postList = thread.get('posts');
    //   const postIndex = findPostIndex(postList, post); //  postList.findIndex(a => a.get('number') === post);
    //   const relevantPost = postList.get(postIndex);
    //   console.log(relevantPost.toJS());
    //   const removedPostsReplies = relevantPost.get('replyPosts');
    //   const replyIndex = findPostIndex(removedPostsReplies, reply); //  removedPostsReplies.findIndex(a => a.get('number') === reply);
    //   // const relevantReply = postList.get(replyIndex);
    //   const relevantReply = removedPostsReplies.get(replyIndex);
    //   const withReinsertedReply = relevantReply !== undefined ? postList.push(
    //     relevantReply) : postList;
    //   console.log('withReinsertedReply: ', withReinsertedReply.toJS());
    //   console.log('relevant reply', relevantReply, 'relReplies:', removedPostsReplies.toJS());
    //   const insertionPost = relevantPost.set('replyPosts', removedPostsReplies.remove(replyIndex));
    //   const withInsertedPost = withReinsertedReply.set(postIndex, insertionPost);
    //   const reSortNumbers = withInsertedPost.sortBy(postItem => postItem.number);
    //   console.log(thread.toJS(), postList.toJS(), 'index: ' + postIndex);
    //   console.log(`for post: ${post} removing reply: ${reply}`);
    //   console.log(withInsertedPost.toJS(), insertionPost.toJS());
    //   patchState({thread: thread.set('posts', reSortNumbers),
    //   alreadyInlinedPosts: newInliningForPosts.remove(reply)});
    //
    // }
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
    const thread = getState().thread;
    const newInliningForPosts = getState().alreadyInlinedPosts;
    const postList = thread.get('posts');
    const postIndex = findPostIndex(postList, post); //  postList.findIndex(a => a.get('number') === post);
    const relevantPost = postList.get(postIndex);
    const withoutReply = postList.map(a => a.set('inlinedPosts', a.inlinedPosts.remove(reply)));
    // const reSortNumbers = withoutReply.set(postIndex, relevantPost.set('inlinedPosts', relevantPost.inlinedPosts.add(reply)))
    patchState({thread: thread.set('posts', withoutReply),
      alreadyInlinedPosts: newInliningForPosts.remove(reply)});

  }

}
