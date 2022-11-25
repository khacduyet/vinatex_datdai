import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu2bComponent } from './bieu2b.component';

describe('Bieu2bComponent', () => {
  let component: Bieu2bComponent;
  let fixture: ComponentFixture<Bieu2bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu2bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
