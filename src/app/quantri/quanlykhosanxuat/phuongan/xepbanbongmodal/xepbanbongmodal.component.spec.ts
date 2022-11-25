import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XepbanbongmodalComponent } from './xepbanbongmodal.component';

describe('XepbanbongmodalComponent', () => {
  let component: XepbanbongmodalComponent;
  let fixture: ComponentFixture<XepbanbongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XepbanbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XepbanbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
