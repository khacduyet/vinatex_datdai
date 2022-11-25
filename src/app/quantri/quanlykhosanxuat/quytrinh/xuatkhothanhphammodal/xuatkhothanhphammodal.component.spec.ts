import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhothanhphammodalComponent } from './xuatkhothanhphammodal.component';

describe('XuatkhothanhphammodalComponent', () => {
  let component: XuatkhothanhphammodalComponent;
  let fixture: ComponentFixture<XuatkhothanhphammodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhothanhphammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhothanhphammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
