import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcaphangcongtrinhComponent } from './modalcaphangcongtrinh.component';

describe('ModalcaphangcongtrinhComponent', () => {
  let component: ModalcaphangcongtrinhComponent;
  let fixture: ComponentFixture<ModalcaphangcongtrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcaphangcongtrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcaphangcongtrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
