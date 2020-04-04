import {PostComponent} from '../app/post/post.component';
import {ImmPost} from '../app/models/post';
import {List, Set} from 'immutable';
import {MediaContainerComponent} from '../app/media-container/media-container.component';
import {ImmMediaInfo} from '../app/models/media-container';
import {PostFormComponent} from '../app/post-form/post-form.component';
import {CatalogThumbnailComponent} from '../app/catalog-thumbnail/catalog-thumbnail.component';

export default {
  title: 'PostForm',
  component: PostFormComponent,
  props: {
    thread: '3',
    board: 'b'
  }
};

// export const noMedia = () => ({
//   component: MediaContainerComponent,
//   props: {
//     // post: new ImmPost({}),
//     // inlining: Set(),
//     // isOp: false
//     mediaListing: List<ImmMediaInfo>([new ImmMediaInfo({})])
//   }
// });
export const postForm = () => ({
  component: PostFormComponent,
  props: {
    thread: '3',
    board: 'b'
  }
});
export const catalogThumbnail = () => ({
  component: CatalogThumbnailComponent,
  props: {
    op: new ImmPost({}),
    threadNumber: '23',
    board: 'b',
    subject: 'sss',
    catalogReplies: List([new ImmPost({
      media: List([new ImmMediaInfo({
        mediaSizeKb: '440902',
        mediaType: 'image',
        thumbnail: {
          contentLen: 4322,
          link: 34,
          height: 85,
          width: 230
        },
        info: {
          contentLength: 2342,
          link: 34,
          height: 85,
          width: 230
        },
        title: 'f'
      })])
    })])
  }
});
