import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from './post/post.component';
import {MediaModule} from '../media/media.module';
import {PipesModule} from '../pipes/pipes.module';



@NgModule({
  declarations: [
    PostComponent,
  ],
  exports: [
    PostComponent
  ],
  imports: [
    CommonModule,
    MediaModule,
    PipesModule
  ]
})
export class PostModule { }
