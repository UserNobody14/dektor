import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {PostService} from '../services/post.service';
import {environment} from '../../environments/environment';
import {UploadService} from '../services/upload.service';
import {List} from 'immutable';
import {ImmPost, InputPost} from '../models/post';
import {UploadObserver} from '../models/upload-observer';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  constructor(private postService: PostService, private uploadService: UploadService) { }
  progressItem: UploadObserver;

  baseUrl = environment.apiUrl;

  @ViewChild('fileInput') fileInput: ElementRef;

  uploader: FileUploader;
  isDropOver: boolean;
  post: InputPost = new ImmPost({}).toJS();

  captcha: string;
  @Input() thread: string;
  @Input() board: string;

  makePost() {

  }

  ngOnInit(): void {
    const headers = []; // [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader(
      {url: this.baseUrl + '/fileAccess/files/1/0', headers}
      );
    this.uploader.onBeforeUploadItem = (fileItem) => {
      console.log(fileItem.formData);
    }
    // const q = this.uploader.queue;
    // q.forEach(fil => fil.file.name)
    // this.uploader.

    // this.uploader.onAfterAddingFile()

    this.uploader.onCompleteAll = () => alert('File uploaded');
  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;

  }

  fileClicked() {
    this.fileInput.nativeElement.click();
  }
  moreFilesSelected($event) {
    console.log('b', $event);
  }
//  TODO: make it work so it uploads the post & upon recieving it: runs the upload service.

  uploadFiles() {
    const files: File[] = this.uploader.queue.map(fil => fil._file);
    this.progressItem = this.uploadService.uploadObserved(List(files), 1);
    this.progressItem.mediaContainer.pipe(
      mergeMap(media => {
        this.post.media = media;
        return this.postService.post(this.post, this.captcha);
      })
    ).subscribe(post => {
        console.log(post);
      }
    );
  }
//  success Object.

}
