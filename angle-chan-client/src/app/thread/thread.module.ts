import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreadRoutingModule } from './thread-routing.module';
import {ThreadComponent} from './thread/thread.component';
import {PostModule} from '../post/post.module';
import {UploadModule} from '../post/upload/upload.module';
import {PipesModule} from '../pipes/pipes.module';


@NgModule({
  declarations: [
    ThreadComponent
  ],
  imports: [
    CommonModule,
    ThreadRoutingModule,
    PostModule,
    UploadModule,
    PipesModule
  ]
})
export class ThreadModule { }
