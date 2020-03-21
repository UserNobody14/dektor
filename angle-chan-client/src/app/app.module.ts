import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { PostEffects } from './store/effects/post.effects';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { environment } from '../environments/environment';
import { ThreadService } from './services/thread.service';
import { ThreadComponent } from './thread/thread.component';
import { NgxsModule } from '@ngxs/store';
import { ThreadState } from './state/thread/thread.state';
import { environment } from '../environments/environment';
import { CatalogComponent } from './catalog/catalog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MediaContainerComponent } from './media-container/media-container.component';
// import { ArtPlayerComponent } from './art-player/art-player.component';
// import { ArtPlayer2Component } from './art-player2/art-player2.component';
// import {VgCoreModule} from 'videogular2/core';
// import {VgControlsModule} from 'videogular2/controls';
// import {VgOverlayPlayModule} from 'videogular2/overlay-play';
// import {VgBufferingModule} from 'videogular2/buffering';
import {VgCoreModule} from 'ngx-videogular';
import {VgOverlayPlayModule} from 'ngx-videogular';
import {VgBufferingModule} from 'ngx-videogular';
import {VgControlsModule} from 'ngx-videogular';
import { VideoContainerComponent } from './video-container/video-container.component';
import { ScrubBarThumbnailsDirective } from './scrub-thumbnails/scrub-bar-thumbnails.directive';
import { ScrubBarThumbnailPreviewComponent } from './scrub-bar-thumbnail-preview/scrub-bar-thumbnail-preview.component';
import { PostNumbersPipe } from './pipes/post-numbers.pipe';
import { ContainsNumberPipe } from './pipes/contains-number.pipe';
import { CatalogThumbnailComponent } from './catalog-thumbnail/catalog-thumbnail.component';
import {CatalogState} from './state/catalog/catalog.state';
import {HttpClientModule} from '@angular/common/http';
import { DateToTimePipe } from './pipes/date-to-time.pipe';
import { PostFormComponent } from './post-form/post-form.component';
import {FileUploadModule} from 'ng2-file-upload';
import { ContentLengthKbPipe } from './pipes/content-length-kb.pipe';
import {FormsModule} from '@angular/forms';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    ThreadComponent,
    CatalogComponent,
    MediaContainerComponent,
    VideoContainerComponent,
    ScrubBarThumbnailsDirective,
    ScrubBarThumbnailPreviewComponent,
    PostNumbersPipe,
    ContainsNumberPipe,
    CatalogThumbnailComponent,
    DateToTimePipe,
    PostFormComponent,
    ContentLengthKbPipe,
    // ArtPlayerComponent,
    // ArtPlayer2Component
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([
      ThreadState,
      CatalogState
    ],
    {developmentMode: !environment.production}
    ),
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FileUploadModule
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
