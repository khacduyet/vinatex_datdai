import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonsodongphannhommayComponent } from './chonsodongphannhommay.component';

describe('ChonsodongphannhommayComponent', () => {
  let component: ChonsodongphannhommayComponent;
  let fixture: ComponentFixture<ChonsodongphannhommayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonsodongphannhommayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonsodongphannhommayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
