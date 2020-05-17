import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '@storybook/angular/demo';
import {PostComponent} from '../app/post/post/post.component';
import {ImmPost} from '../app/models/post';
import {List, Set} from 'immutable';
import {MediaContainerComponent} from '../app/media/media-container/media-container.component';
import {ImmMediaInfo} from '../app/models/media-container';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => ({
  component: Button,
  props: {
    text: 'Hello Button',
  },
});

export const Emoji = () => ({
  component: Button,
  props: {
    text: '😀 😎 👍 💯',
  },
});

Emoji.story = {
  parameters: { notes: 'My notes on a button with emojis' },
};

export const WithSomeEmojiAndAction = () => ({
  component: Button,
  props: {
    text: '😀 😎 👍 💯',
    onClick: action('This was clicked OMG'),
  },
});

WithSomeEmojiAndAction.story = {
  name: 'with some emoji and action',
  parameters: { notes: 'My notes on a button with emojis' },
};

export const ButtonWithLinkToAnotherStory = () => ({
  component: Button,
  props: {
    text: 'Go to Welcome Story',
    onClick: linkTo('Welcome'),
  },
});

ButtonWithLinkToAnotherStory.story = {
  name: 'button with link to another story',
};

// export const noMedia = () => ({
//   component: PostComponent,
//   props: {
//     post: new ImmPost({}),
//     inlining: Set(),
//     isOp: false
//   }
// });
export const noMedia = () => ({
  component: MediaContainerComponent,
  props: {
    // post: new ImmPost({}),
    // inlining: Set(),
    // isOp: false
    mediaListing: List<ImmMediaInfo>([new ImmMediaInfo({
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
  }
});
