import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MediaContainerComponent} from './media-container/media-container.component';
import {VideoContainerComponent} from './video-container/video-container.component';
import {ScrubBarThumbnailsDirective} from './scrub-thumbnails/scrub-bar-thumbnails.directive';
import {ScrubBarThumbnailPreviewComponent} from './scrub-bar-thumbnail-preview/scrub-bar-thumbnail-preview.component';
import {VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule} from 'ngx-videogular';

const mediaElements = [
  MediaContainerComponent,
  VideoContainerComponent,
  ScrubBarThumbnailsDirective,
  ScrubBarThumbnailPreviewComponent
];

@NgModule({
  declarations: [
    ...mediaElements
  ],
  exports: [
    ...mediaElements
  ],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ]
})
export class MediaModule { }
