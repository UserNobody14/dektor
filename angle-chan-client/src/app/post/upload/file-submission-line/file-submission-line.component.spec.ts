import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSubmissionLineComponent } from './file-submission-line.component';

describe('FileSubmissionLineComponent', () => {
  let component: FileSubmissionLineComponent;
  let fixture: ComponentFixture<FileSubmissionLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSubmissionLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSubmissionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
