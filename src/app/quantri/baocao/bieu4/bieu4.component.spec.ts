import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu4Component } from './bieu4.component';

describe('Bieu4Component', () => {
  let component: Bieu4Component;
  let fixture: ComponentFixture<Bieu4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
