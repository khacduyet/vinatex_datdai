import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HacapComponent } from './hacap.component';

describe('HacapComponent', () => {
  let component: HacapComponent;
  let fixture: ComponentFixture<HacapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
