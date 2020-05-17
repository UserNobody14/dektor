import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFileDropComponent } from './private-file-drop.component';

describe('PrivateFileDropComponent', () => {
  let component: PrivateFileDropComponent;
  let fixture: ComponentFixture<PrivateFileDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateFileDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFileDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
