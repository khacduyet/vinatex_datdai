import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathangmodelComponent } from './mathangmodel.component';

describe('MathangmodelComponent', () => {
  let component: MathangmodelComponent;
  let fixture: ComponentFixture<MathangmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathangmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathangmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
