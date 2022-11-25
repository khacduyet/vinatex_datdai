import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowgiadatComponent } from './modal-showgiadat.component';

describe('ModalShowgiadatComponent', () => {
  let component: ModalShowgiadatComponent;
  let fixture: ComponentFixture<ModalShowgiadatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowgiadatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowgiadatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
