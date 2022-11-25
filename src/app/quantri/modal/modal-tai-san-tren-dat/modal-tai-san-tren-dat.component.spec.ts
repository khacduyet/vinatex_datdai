import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaiSanTrenDatComponent } from './modal-tai-san-tren-dat.component';

describe('ModalTaiSanTrenDatComponent', () => {
  let component: ModalTaiSanTrenDatComponent;
  let fixture: ComponentFixture<ModalTaiSanTrenDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTaiSanTrenDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTaiSanTrenDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
