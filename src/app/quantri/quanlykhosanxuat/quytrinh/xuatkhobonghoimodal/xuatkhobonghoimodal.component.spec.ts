import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhobonghoimodalComponent } from './xuatkhobonghoimodal.component';

describe('XuatkhobonghoimodalComponent', () => {
  let component: XuatkhobonghoimodalComponent;
  let fixture: ComponentFixture<XuatkhobonghoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhobonghoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhobonghoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
