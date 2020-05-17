import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRecaptchaComponent } from './private-recaptcha.component';

describe('PrivateRecaptchaComponent', () => {
  let component: PrivateRecaptchaComponent;
  let fixture: ComponentFixture<PrivateRecaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateRecaptchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateRecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
