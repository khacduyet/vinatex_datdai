import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu1bComponent } from './bieu1b.component';

describe('Bieu1bComponent', () => {
  let component: Bieu1bComponent;
  let fixture: ComponentFixture<Bieu1bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu1bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu1bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
