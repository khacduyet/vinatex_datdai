import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbaocaotonghopComponent } from './modalbaocaotonghop.component';

describe('ModalbaocaotonghopComponent', () => {
  let component: ModalbaocaotonghopComponent;
  let fixture: ComponentFixture<ModalbaocaotonghopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbaocaotonghopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbaocaotonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
