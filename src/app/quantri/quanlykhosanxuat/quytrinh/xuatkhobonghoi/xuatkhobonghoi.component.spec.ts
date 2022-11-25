import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhobonghoiComponent } from './xuatkhobonghoi.component';

describe('XuatkhobonghoiComponent', () => {
  let component: XuatkhobonghoiComponent;
  let fixture: ComponentFixture<XuatkhobonghoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhobonghoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhobonghoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
