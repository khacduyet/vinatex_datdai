import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrienkhaikehoachsanxuatmodalComponent } from './trienkhaikehoachsanxuatmodal.component';

describe('TrienkhaikehoachsanxuatmodalComponent', () => {
  let component: TrienkhaikehoachsanxuatmodalComponent;
  let fixture: ComponentFixture<TrienkhaikehoachsanxuatmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrienkhaikehoachsanxuatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrienkhaikehoachsanxuatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
