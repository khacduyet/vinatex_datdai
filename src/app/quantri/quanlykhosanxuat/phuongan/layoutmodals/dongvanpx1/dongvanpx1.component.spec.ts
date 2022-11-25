import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dongvanpx1Component } from './dongvanpx1.component';

describe('Dongvanpx1Component', () => {
  let component: Dongvanpx1Component;
  let fixture: ComponentFixture<Dongvanpx1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dongvanpx1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dongvanpx1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
