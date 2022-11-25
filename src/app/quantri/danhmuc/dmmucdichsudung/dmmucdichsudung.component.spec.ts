import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmmucdichsudungComponent } from './dmmucdichsudung.component';

describe('DmmucdichsudungComponent', () => {
  let component: DmmucdichsudungComponent;
  let fixture: ComponentFixture<DmmucdichsudungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmmucdichsudungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmmucdichsudungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
