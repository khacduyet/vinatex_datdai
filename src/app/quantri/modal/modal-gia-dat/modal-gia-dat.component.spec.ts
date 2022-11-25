import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGiaDatComponent } from './modal-gia-dat.component';

describe('ModalGiaDatComponent', () => {
  let component: ModalGiaDatComponent;
  let fixture: ComponentFixture<ModalGiaDatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGiaDatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGiaDatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
