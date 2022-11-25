import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoithongkebaocaoComponent } from './theodoithongkebaocao.component';

describe('TheodoithongkebaocaoComponent', () => {
  let component: TheodoithongkebaocaoComponent;
  let fixture: ComponentFixture<TheodoithongkebaocaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoithongkebaocaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoithongkebaocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
