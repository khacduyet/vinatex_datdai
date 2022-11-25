import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladvancedsearchComponent } from './modaladvancedsearch.component';

describe('ModaladvancedsearchComponent', () => {
  let component: ModaladvancedsearchComponent;
  let fixture: ComponentFixture<ModaladvancedsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaladvancedsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaladvancedsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
