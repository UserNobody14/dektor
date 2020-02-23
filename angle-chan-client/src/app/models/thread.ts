import { List, Record } from 'immutable';
import {ImmPost, InputPost, Post} from './post';
export interface Thread {
  posts: List<ImmPost>;
  // originalPost: ImmPost;
  number: number;
  subject: string;
}
export interface InputThread {
  posts: InputPost[];
  // originalPost: ImmPost;
  number: number;
  subject: string;
}
const threadRecord = Record<Thread>({
  posts: List<ImmPost>([]),
  // originalPost: new ImmPost({}),
  number: 0,
  subject: ''
});

export class ImmThread extends threadRecord implements Thread {
  constructor(thread: Partial<Thread>) {
    super(thread);
  }
}
