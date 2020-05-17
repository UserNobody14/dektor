import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogThumbnailComponent } from './catalog-thumbnail.component';

describe('CatalogThumbnailComponent', () => {
  let component: CatalogThumbnailComponent;
  let fixture: ComponentFixture<CatalogThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
