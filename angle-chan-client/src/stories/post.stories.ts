import {PostComponent} from '../app/post/post.component';
import {ImmPost} from '../app/models/post';
import {List, Set} from 'immutable';
import {MediaContainerComponent} from '../app/media-container/media-container.component';
import {ImmMediaInfo} from '../app/models/media-container';
import {PostFormComponent} from '../app/upload/post-form/post-form.component';
import {CatalogThumbnailComponent} from '../app/catalog-thumbnail/catalog-thumbnail.component';
import {FormGroupDirective} from '@angular/forms';
import {FileSubmissionLineComponent} from '../app/upload/file-submission-line/file-submission-line.component';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../app/app-routing.module';
import {AppModule} from '../app/app.module';
import {CatalogComponent} from '../app/catalog/catalog.component';
import {ThreadComponent} from '../app/thread/thread.component';
import {APP_BASE_HREF} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {ThreadState} from '../app/state/thread/thread.state';
import {CatalogState} from '../app/state/catalog/catalog.state';
import {environment} from '../environments/environment';
import {UploadModule} from '../app/upload/upload.module';

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
const postForm = () => ({
  component: PostFormComponent,
  props: {
    formGroup: FormGroupDirective,
    thread: '3',
    board: 'b'
  }
});
const fileSubmissionLine = () => ({
  component: FileSubmissionLineComponent,
  props: {
    hasFile: true,
    validRecaptcha: false
  }
});
// storiesOf('post form', module).addDecorator(
//   moduleMetadata({
//     imports: [UploadModule]
//   })
// ).add('submits', fileSubmissionLine);
export const catalogThumbnail = () => ({
  component: CatalogThumbnailComponent,
  props: {
    op: new ImmPost({
      media: [{
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
      }]
    }),
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
// storiesOf('ngxsMaybe', module)
// .addDecorator(moduleMetadata({
//   declarations: [CatalogThumbnailComponent,
//     PostComponent,
//     ThreadComponent,
//     CatalogComponent,
//     MediaContainerComponent],
//   providers: [{
//     provide: APP_BASE_HREF,
//     useValue: '/'
//   }],
//   imports: [AppRoutingModule,
//     NgxsModule.forRoot([
//         ThreadState,
//         CatalogState
//       ],
//       {developmentMode: !environment.production}
//     )]
// }))
//   .add('My catalog story', catalogThumbnail);

