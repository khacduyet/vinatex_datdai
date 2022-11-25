import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalquytrinhsapxepComponent } from './modalquytrinhsapxep.component';

describe('ModalquytrinhsapxepComponent', () => {
  let component: ModalquytrinhsapxepComponent;
  let fixture: ComponentFixture<ModalquytrinhsapxepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalquytrinhsapxepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalquytrinhsapxepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
