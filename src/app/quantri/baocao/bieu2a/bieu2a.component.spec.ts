import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu2aComponent } from './bieu2a.component';

describe('Bieu2aComponent', () => {
  let component: Bieu2aComponent;
  let fixture: ComponentFixture<Bieu2aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu2aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu2aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
