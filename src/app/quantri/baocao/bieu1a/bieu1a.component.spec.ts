import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu1aComponent } from './bieu1a.component';

describe('Bieu1aComponent', () => {
  let component: Bieu1aComponent;
  let fixture: ComponentFixture<Bieu1aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu1aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
