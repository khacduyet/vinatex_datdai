import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldonvisohuunhadatComponent } from './modaldonvisohuunhadat.component';

describe('ModaldonvisohuunhadatComponent', () => {
  let component: ModaldonvisohuunhadatComponent;
  let fixture: ComponentFixture<ModaldonvisohuunhadatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldonvisohuunhadatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldonvisohuunhadatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
