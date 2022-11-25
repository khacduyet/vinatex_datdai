import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DactinhbongComponent } from './dactinhbong.component';

describe('DactinhbongComponent', () => {
  let component: DactinhbongComponent;
  let fixture: ComponentFixture<DactinhbongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DactinhbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DactinhbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
