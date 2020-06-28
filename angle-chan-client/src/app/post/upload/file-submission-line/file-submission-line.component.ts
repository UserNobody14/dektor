import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FileItem} from 'ng2-file-upload';
// import * as vfs from  'font-awesome/css/font-awesome.css';

@Component({
  selector: 'app-file-submission-line',
  templateUrl: './file-submission-line.component.html',
  styleUrls: ['./file-submission-line.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FileSubmissionLineComponent implements OnInit {
  @Input() isLast: boolean;
  @Input() fileItem: FileItem;
  @Input() hasFile: boolean;
  @Input() validRecaptcha: boolean;
  @Output() submitF = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
