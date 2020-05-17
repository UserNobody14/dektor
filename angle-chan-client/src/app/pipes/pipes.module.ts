import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateToTimePipe} from './date-to-time.pipe';
import {ContentLengthKbPipe} from './content-length-kb.pipe';
import {PostNumbersPipe} from './post-numbers.pipe';
import {ContainsNumberPipe} from './contains-number.pipe';

const allPipes = [
  DateToTimePipe,
  ContentLengthKbPipe,
  PostNumbersPipe,
  ContainsNumberPipe,
];


@NgModule({
  declarations: [
    ...allPipes
  ],
  exports: [
    ...allPipes
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
