import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DactinhbongmodalComponent } from './dactinhbongmodal.component';

describe('DactinhbongmodalComponent', () => {
  let component: DactinhbongmodalComponent;
  let fixture: ComponentFixture<DactinhbongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DactinhbongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DactinhbongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
