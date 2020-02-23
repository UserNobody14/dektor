// import { Post } from './post';
import {Record, Set, List} from 'immutable';
import {ImmMediaInfo, MediaContainer, MediaInfo} from './media-container';
import {isUndefined} from 'util';

export interface Post {
  text: string;
  number: number;
  // date: string;
  name: string;
  replies: number[];
  inlinedPosts: Set<number>;
  // replyPosts: List<ImmPost>;
  replyingTo: Post[];
  media: List<ImmMediaInfo>;
  // image: string;
  utc: string;
}
export interface InputPost {
  text: string;
  number: number;
  // date: string;
  name: string;
  replies: number[];
  // inlinedPosts: Set<number>;
  // replyPosts: List<ImmPost>;
  replyingTo: Post[];
  mediaC?: MediaContainer[];
  // image: string;
  utc: string;
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

  constructor(post: Partial<Post> | Partial<InputPost>, mediaInfo?: MediaContainer[]) {
    let inP;
    if ('mediaC' in post) {
      inP = {media: List(post.mediaC), ...post};
    } else {
      inP = post;
      if (mediaInfo) {
        inP.media = List(mediaInfo).map(a => new ImmMediaInfo(a));
      }
    }
    super(inP);
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
