import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachsanxuatmodalComponent } from './kehoachsanxuatmodal.component';

describe('KehoachsanxuatmodalComponent', () => {
  let component: KehoachsanxuatmodalComponent;
  let fixture: ComponentFixture<KehoachsanxuatmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachsanxuatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachsanxuatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
