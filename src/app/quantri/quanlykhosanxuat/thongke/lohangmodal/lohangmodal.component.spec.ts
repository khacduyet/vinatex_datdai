import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LohangmodalComponent } from './lohangmodal.component';

describe('LohangmodalComponent', () => {
  let component: LohangmodalComponent;
  let fixture: ComponentFixture<LohangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LohangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LohangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
