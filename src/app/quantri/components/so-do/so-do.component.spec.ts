import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDoComponent } from './so-do.component';

describe('SoDoComponent', () => {
  let component: SoDoComponent;
  let fixture: ComponentFixture<SoDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
