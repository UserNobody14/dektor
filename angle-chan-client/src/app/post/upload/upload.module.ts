import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostFormComponent} from './post-form/post-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { UploadTableComponent } from './upload-table/upload-table.component';
import {FileUploadModule} from 'ng2-file-upload';
import { PrivateRecaptchaComponent } from './private-recaptcha/private-recaptcha.component';
import { PrivateFileDropComponent } from './private-file-drop/private-file-drop.component';
import { FileSubmissionLineComponent } from './file-submission-line/file-submission-line.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faClipboard, faEdit, faLink, faPlusSquare, faTimesCircle} from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [
    PostFormComponent,
    UploadTableComponent,
    PrivateRecaptchaComponent,
    PrivateFileDropComponent,
    FileSubmissionLineComponent
  ],
  exports: [
    PostFormComponent,
    UploadTableComponent,
    FileSubmissionLineComponent
  ],
  id: 'UploadModule',
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaFormsModule,
    FileUploadModule,
    RecaptchaModule
  ]
})
export class UploadModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faClipboard, faEdit, faTimesCircle, faPlusSquare, faLink);
  }
}
