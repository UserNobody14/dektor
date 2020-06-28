import { List, Record } from 'immutable';
import {ImmPost, InputPost, Post} from './post';
export interface Board {
  boardName: string;
}
export interface GenericThread<T> {
  posts?: T;
  number: number;
  subject: string;
  board: Board;
}
export interface Thread extends GenericThread<List<ImmPost>> {
}
export interface InputThread extends GenericThread<InputPost[]> {
}
const threadRecord = Record<Thread>({
  posts: List<ImmPost>([]),
  // originalPost: new ImmPost({}),
  number: 0,
  subject: '',
  board: {
    boardName: ''
  }
});

export class ImmThread extends threadRecord implements Thread {
  constructor(thread: Partial<Thread>) {
    super(thread);
  }
}
export interface ThreadNotFound {
  threadNumber: number;
  dateNotFound: Date;
  isCurrentThread: boolean;
  message: string;
  otherThreadError: boolean;
}
