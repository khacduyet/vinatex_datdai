import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhomodalComponent } from './xuatkhomodal.component';

describe('XuatkhomodalComponent', () => {
  let component: XuatkhomodalComponent;
  let fixture: ComponentFixture<XuatkhomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
