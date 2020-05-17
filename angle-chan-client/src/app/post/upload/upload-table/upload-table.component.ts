import {Component, Input, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UploadObserver} from '../../../models/upload-observer';

@Component({
  selector: 'app-upload-table',
  templateUrl: './upload-table.component.html',
  styleUrls: ['./upload-table.component.css']
})
export class UploadTableComponent implements OnInit {

  @Input()
  uploader: FileUploader;
  @Input()
  progressItem: UploadObserver;

  constructor() { }

  ngOnInit(): void {
  }

}
