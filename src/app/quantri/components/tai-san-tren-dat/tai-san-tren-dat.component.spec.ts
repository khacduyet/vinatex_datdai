import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiSanTrenDatComponent } from './tai-san-tren-dat.component';

describe('TaiSanTrenDatComponent', () => {
  let component: TaiSanTrenDatComponent;
  let fixture: ComponentFixture<TaiSanTrenDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiSanTrenDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiSanTrenDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
