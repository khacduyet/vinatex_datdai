import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bieu1cComponent } from './bieu1c.component';

describe('Bieu1cComponent', () => {
  let component: Bieu1cComponent;
  let fixture: ComponentFixture<Bieu1cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bieu1cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bieu1cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
