import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalquanComponent } from './modalquan.component';

describe('ModalquanComponent', () => {
  let component: ModalquanComponent;
  let fixture: ComponentFixture<ModalquanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalquanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalquanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
