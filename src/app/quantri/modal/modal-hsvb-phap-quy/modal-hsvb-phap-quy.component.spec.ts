import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHsvbPhapQuyComponent } from './modal-hsvb-phap-quy.component';

describe('ModalHsvbPhapQuyComponent', () => {
  let component: ModalHsvbPhapQuyComponent;
  let fixture: ComponentFixture<ModalHsvbPhapQuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHsvbPhapQuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHsvbPhapQuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
