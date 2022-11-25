import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmuctieuhaoComponent } from './dinhmuctieuhao.component';

describe('DinhmuctieuhaoComponent', () => {
  let component: DinhmuctieuhaoComponent;
  let fixture: ComponentFixture<DinhmuctieuhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmuctieuhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmuctieuhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
