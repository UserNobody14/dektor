import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-private-file-drop',
  templateUrl: './private-file-drop.component.html',
  styleUrls: ['./private-file-drop.component.css']
})
export class PrivateFileDropComponent implements OnInit {
  @Input() uploader: FileUploader;
  @Input() isDropOver: boolean;
  // @Output() fileClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() moreFilesSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileOverAnother: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  fileClicked() {
    this.fileInput.nativeElement.click();
  }

}
