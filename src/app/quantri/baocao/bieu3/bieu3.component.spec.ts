import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu3Component } from './bieu3.component';

describe('Bieu3Component', () => {
  let component: Bieu3Component;
  let fixture: ComponentFixture<Bieu3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
