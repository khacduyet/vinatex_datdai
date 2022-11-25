import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhobongpheComponent } from './xuatkhobongphe.component';

describe('XuatkhobongpheComponent', () => {
  let component: XuatkhobongpheComponent;
  let fixture: ComponentFixture<XuatkhobongpheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhobongpheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhobongpheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
