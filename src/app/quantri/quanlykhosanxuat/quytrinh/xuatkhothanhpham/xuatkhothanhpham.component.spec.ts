import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhothanhphamComponent } from './xuatkhothanhpham.component';

describe('XuatkhothanhphamComponent', () => {
  let component: XuatkhothanhphamComponent;
  let fixture: ComponentFixture<XuatkhothanhphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhothanhphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhothanhphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
