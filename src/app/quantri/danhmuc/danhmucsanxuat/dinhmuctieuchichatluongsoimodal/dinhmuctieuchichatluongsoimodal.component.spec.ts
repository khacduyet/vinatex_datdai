import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmuctieuchichatluongsoimodalComponent } from './dinhmuctieuchichatluongsoimodal.component';

describe('DinhmuctieuchichatluongsoimodalComponent', () => {
  let component: DinhmuctieuchichatluongsoimodalComponent;
  let fixture: ComponentFixture<DinhmuctieuchichatluongsoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmuctieuchichatluongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmuctieuchichatluongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
