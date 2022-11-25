import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTaiSanTrenDatComponent } from './crud-tai-san-tren-dat.component';

describe('CrudTaiSanTrenDatComponent', () => {
  let component: CrudTaiSanTrenDatComponent;
  let fixture: ComponentFixture<CrudTaiSanTrenDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTaiSanTrenDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTaiSanTrenDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
