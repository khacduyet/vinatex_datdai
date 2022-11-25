import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaphangcongtrinhComponent } from './dmcaphangcongtrinh.component';

describe('DmcaphangcongtrinhComponent', () => {
  let component: DmcaphangcongtrinhComponent;
  let fixture: ComponentFixture<DmcaphangcongtrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaphangcongtrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaphangcongtrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
