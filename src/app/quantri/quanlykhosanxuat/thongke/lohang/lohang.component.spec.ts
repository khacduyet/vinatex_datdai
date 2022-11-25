import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LohangComponent } from './lohang.component';

describe('LohangComponent', () => {
  let component: LohangComponent;
  let fixture: ComponentFixture<LohangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LohangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LohangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
