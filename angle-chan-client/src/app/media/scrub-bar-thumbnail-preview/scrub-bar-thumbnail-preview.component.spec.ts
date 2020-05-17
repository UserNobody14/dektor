import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrubBarThumbnailPreviewComponent } from './scrub-bar-thumbnail-preview.component';

describe('ScrubBarThumbnailPreviewComponent', () => {
  let component: ScrubBarThumbnailPreviewComponent;
  let fixture: ComponentFixture<ScrubBarThumbnailPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrubBarThumbnailPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrubBarThumbnailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
