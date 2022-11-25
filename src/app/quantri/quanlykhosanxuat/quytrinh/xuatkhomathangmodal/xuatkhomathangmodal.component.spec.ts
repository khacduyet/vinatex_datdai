import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhomathangmodalComponent } from './xuatkhomathangmodal.component';

describe('XuatkhomathangmodalComponent', () => {
  let component: XuatkhomathangmodalComponent;
  let fixture: ComponentFixture<XuatkhomathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhomathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhomathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
