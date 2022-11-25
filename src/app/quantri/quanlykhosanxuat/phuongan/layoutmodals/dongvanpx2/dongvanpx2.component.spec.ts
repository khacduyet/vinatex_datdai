import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dongvanpx2Component } from './dongvanpx2.component';

describe('Dongvanpx2Component', () => {
  let component: Dongvanpx2Component;
  let fixture: ComponentFixture<Dongvanpx2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dongvanpx2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dongvanpx2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
