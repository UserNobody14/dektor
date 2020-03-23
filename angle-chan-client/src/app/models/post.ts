// import { Post } from './post';
import {Record, Set, List} from 'immutable';
import {ImmMediaInfo, MediaContainer, MediaInfo} from './media-container';
import {isUndefined} from 'util';
import {GenericThread} from './thread';

export interface GenericPost<T> {
  text: string;
  number: number;
  // date: string;
  name: string;
  replies: number[];
  // replyPosts: List<ImmPost>;
  replyingTo: Post[];
  media?: T;
  // image: string;
  utc: string;
}

export interface Post extends GenericPost<List<ImmMediaInfo>> {
  text: string;
  number: number;
  // date: string;
  name: string;
  replies: number[];
  inlinedPosts: Set<number>;
  //add in all the changes to threads and such here, and try to get it to go back.
  //TODO: alot.
  // replyPosts: List<ImmPost>;
  replyingTo: Post[];
  media?: List<ImmMediaInfo>;
  // image: string;
  utc: string;
}

export interface InputPost extends GenericPost<MediaContainer[]> {
  thread?: GenericThread<InputPost[]> | number;
}

const postRecord = Record<Post>({
  text: '',
  number: 0,
  // date: '',
  name: 'Anonymous',
  replies: [],
  // replyPosts: List<ImmPost>([]),
  inlinedPosts: Set<number>([]),
  replyingTo: [],
  media: null,
  // image: '1573343887_1573340897764s.jpg',
  utc: '0'
});

export class ImmPost extends postRecord implements Post {

  constructor(
    post: Partial<GenericPost<MediaContainer[]>> | Partial<Post>,
    mediaInfo?: MediaContainer[]) {
      const ls: List<ImmMediaInfo> = List(post.media).map(a => new ImmMediaInfo(a));
      const med: Partial<Post> = {
        ...post,
        media: ls,
      };
      super(med);
  }

  getName(): string {
    return this.get('name');
  }

  setName(name: string): this {
    return this.set('name', name);
  }

  getText(): string {
    return this.get('text');
  }

  setText(text: string): this {
    return this.set('text', text);
  }
}

// export class ImmPost extends postRecord implements Post {
//   text: string;
//   number: number;
//   date: string;
//   name: string;
//   replies: number[];
//   replyingTo: number[];
//   constructor(config: Partial<Post>) {
//     super(config);
//   }
// }
