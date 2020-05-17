import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
// import * as vfs from  'font-awesome/css/font-awesome.css';

@Component({
  selector: 'app-file-submission-line',
  templateUrl: './file-submission-line.component.html',
  styleUrls: ['./file-submission-line.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FileSubmissionLineComponent implements OnInit {
  @Input() fileName: string;
  @Input() hasFile: boolean;
  @Input() validRecaptcha: boolean;
  @Output() submitF = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
