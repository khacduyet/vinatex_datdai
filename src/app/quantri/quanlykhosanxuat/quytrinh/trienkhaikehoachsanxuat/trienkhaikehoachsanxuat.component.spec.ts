import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrienkhaikehoachsanxuatComponent } from './trienkhaikehoachsanxuat.component';

describe('TrienkhaikehoachsanxuatComponent', () => {
  let component: TrienkhaikehoachsanxuatComponent;
  let fixture: ComponentFixture<TrienkhaikehoachsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrienkhaikehoachsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrienkhaikehoachsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
