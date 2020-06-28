import {ImmPost} from './post';
import {MediaContainer} from './media-container';
import {List} from 'immutable';

export interface CatalogItem {
  post: ImmPost;
  subject: string;
  media: MediaContainer;
  replies: List<ImmPost>;
  number: number;
}
