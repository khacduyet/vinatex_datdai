import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalThuaDatComponent } from './modal-thua-dat.component';

describe('ModalThuaDatComponent', () => {
  let component: ModalThuaDatComponent;
  let fixture: ComponentFixture<ModalThuaDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalThuaDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalThuaDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
