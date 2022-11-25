import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu5Component } from './bieu5.component';

describe('Bieu5Component', () => {
  let component: Bieu5Component;
  let fixture: ComponentFixture<Bieu5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
