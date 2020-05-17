import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post/post.component';
import { ThreadService } from './services/thread.service';
import { ThreadComponent } from './thread/thread/thread.component';
import { NgxsModule } from '@ngxs/store';
import { ThreadState } from './state/thread/thread.state';
import { environment } from '../environments/environment';
import { CatalogComponent } from './catalog/catalog/catalog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MediaContainerComponent } from './media/media-container/media-container.component';
import {VgCoreModule} from 'ngx-videogular';
import {VgOverlayPlayModule} from 'ngx-videogular';
import {VgBufferingModule} from 'ngx-videogular';
import {VgControlsModule} from 'ngx-videogular';
import { VideoContainerComponent } from './media/video-container/video-container.component';
import { ScrubBarThumbnailsDirective } from './media/scrub-thumbnails/scrub-bar-thumbnails.directive';
import { ScrubBarThumbnailPreviewComponent } from './media/scrub-bar-thumbnail-preview/scrub-bar-thumbnail-preview.component';
import { PostNumbersPipe } from './pipes/post-numbers.pipe';
import { ContainsNumberPipe } from './pipes/contains-number.pipe';
import { CatalogThumbnailComponent } from './catalog/catalog-thumbnail/catalog-thumbnail.component';
import {CatalogState} from './state/catalog/catalog.state';
import {HttpClientModule} from '@angular/common/http';
import { DateToTimePipe } from './pipes/date-to-time.pipe';
import { PostFormComponent } from './post/upload/post-form/post-form.component';
import {FileUploadModule} from 'ng2-file-upload';
import { ContentLengthKbPipe } from './pipes/content-length-kb.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {UploadModule} from './post/upload/upload.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MediaModule} from './media/media.module';
import {PipesModule} from './pipes/pipes.module';


@NgModule({
  declarations: [
    AppComponent,
    // ArtPlayerComponent,
    // ArtPlayer2Component
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxsModule.forRoot([
        ThreadState,
        CatalogState
      ],
      {developmentMode: !environment.production}
    ),
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    UploadModule,
    FontAwesomeModule,
    MediaModule,
    PipesModule
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
