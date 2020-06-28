import { State, Selector, Action, StateContext } from '@ngxs/store';
import {ImmThread, ThreadNotFound} from '../../models/thread';
import {List, Set, Record} from 'immutable';
import {GetNextPage, GetPostsForThread, InlineReply, RemoveInliningForReply, ShowReplyInPost, UnShowReplyInPost} from './thread.actions';
import { ThreadService } from '../../services/thread.service';
import {catchError, tap} from 'rxjs/operators';
import {ImmPost, InputPost} from '../../models/post';
import {isNull, isUndefined} from 'util';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {GenericPage} from '../../models/generic-page';
import {HttpErrorResponse} from '@angular/common/http';


function findPostIndex(posts: List<ImmPost>, n: number) {
  return posts.findIndex(a => a.get('number') === n);
}
function mustNotBeNull(item: number) {
  if (item === null || item === undefined) {
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
  notFound: ThreadNotFound;
  thread: ImmThread;
  pageNumber: number;
  alreadyInlinedPosts: Set<number>;
  mostRecentPage: GenericPage<null>;
}
// const threadStateModelRecord = Record<>({})

function logPageNumbers(page: number, currentThread: number, threadNumber: number, pageNumber: number) {
  console.log(`
      page: ${page}
      currentThread: ${currentThread}
      threadNumber: ${threadNumber}
      pageNumber: ${pageNumber}`
  );
}

function logPageValues(invalue: GenericPage<InputPost>, pageNumber: number) {
  console.log(`
      After finishing the inputs:
      totalPages: ${invalue.totalPages}
      totalElements: ${invalue.totalElements}
      isLast: ${invalue.last}
      number: ${invalue.number}
      pageNumber: ${pageNumber}`
  );
}

function nullifyPage<T>(page: GenericPage<T>): GenericPage<null> {
  return {...page, content: null};
}

@State<ThreadStateModel>({
    name: 'thread',
    defaults: {
      thread: new ImmThread({}),
      pageNumber: 0,
      alreadyInlinedPosts: Set([]),
      notFound: {
        otherThreadError: false,
        message: '',
        threadNumber: 0,
        isCurrentThread: false,
        dateNotFound: new Date()
      },
      mostRecentPage: {
        content: null,
        pageable: {
          sort: {
            unsorted: false,
            sorted: false,
            empty: false,
          },
          offset: 0,
          pageSize: 0,
          pageNumber: 0,
          paged: false,
          unpaged: false,
        },
        totalElements: 0,
        totalPages: 0,
        last: false,
        size: 0,
        number: 0,
        sort: {
                  unsorted: false,
                  sorted: false,
                  empty: false,
        },
        numberOfElements: 0,
        first: false,
        empty: false,
      }
    }
})
@Injectable()
export class ThreadState {

    constructor(private threadService: ThreadService) { }

    @Selector()
    public static getState(state: ThreadStateModel) {
        return state;
    }
    @Selector()
    public static posts(state: ThreadStateModel) {
        return state.thread.get('posts').sortBy(qq => qq.number);
    }
    @Selector()
    public static inlined(state: ThreadStateModel) {
      return state.alreadyInlinedPosts;
    }
    @Selector()
    public static findPosts(state: ThreadStateModel) {
      return (a: number) => {
        // console.log('foundin a: ',  a);
        // inefficient?
        return state.thread.get('posts').find(b => b.get('number') === a);
      };
    }
    @Selector()
    public static exceptionHandler(state: ThreadStateModel) {
      return state.notFound;
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
    { payload, board }: GetNextPage
  ) {
      const st = getState();
      const page = st.mostRecentPage.number;
      // const currentThreadPosts = st.thread;
      //if the threadnumber in the payload is different, reset;
      // edge cases: st.thread.number is null
      //pageNumber is null
      //payload is null
      //a combination of these.
      const currentThread = st.thread.number;
      const threadNumber = payload ? payload : currentThread;
      mustNotBeNull(threadNumber);
      const isDifferentFromCurrentPage = payload !== currentThread;
      const isPage0 = (payload && isDifferentFromCurrentPage);
      // Now deal with situations where last pageSize items may have changed before user refreshed the thread?
      const currentPageIsLastPage = !isDifferentFromCurrentPage && st.mostRecentPage.last;
      const rerunLastPage = currentPageIsLastPage ? page : page + 1;
      const pageNumber = isPage0 ? 0 : rerunLastPage;
      const notFound = (isCurrentThread: boolean, message?: string, otherThreadError?: boolean): ThreadNotFound => ({
        otherThreadError,
        message,
        threadNumber,
        isCurrentThread,
        dateNotFound: new Date()
      });
      // logging the issues:
      logPageNumbers(page, currentThread, threadNumber, pageNumber);
      // if this is the last page, set the last page variable.
      // if getNextPage is called and its the last page
      return this.threadService.getPostsPaged(threadNumber,  pageNumber, board).pipe(
        // catches the errors and resolves them.
        catchError((err: HttpErrorResponse) => {
          const errHeader = err.headers.get('thread-not-found-status');
          console.log('Handling error locally and rethrowing it...', err);
          patchState({
            notFound: notFound(true, errHeader, errHeader !== 'true')
          });
          return throwError(err);
        }),
        tap((invalue: GenericPage<InputPost>) => {
          const inList: List<ImmPost> = List(invalue.content).map(a => new ImmPost(a));
          // if currentPageIsLastPage && !invalue.last get the new pages?
          const concatList = currentPageIsLastPage ?
            st.thread.posts.concat(
              inList.filter(
                qq => !st.thread.posts.map(aa => aa.number).toSet().has(qq.number)
              )
            ) : st.thread.posts.concat(inList);
          const thread: ImmThread = st.thread.set(
            'posts',
            // temp solution?
            isPage0 ? inList : concatList
          ).set(
            'number',
            threadNumber
          );
          //TODO: save an error value in the threadstate?
          //TODO: make it determine the max pages and do something?
          logPageValues(invalue, pageNumber);
          patchState({
            mostRecentPage: nullifyPage(invalue),
            notFound: notFound(false),
            thread,
            pageNumber,
          });
        })
      );
  }

}
