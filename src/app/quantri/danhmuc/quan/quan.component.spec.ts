import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanComponent } from './quan.component';

describe('QuanComponent', () => {
  let component: QuanComponent;
  let fixture: ComponentFixture<QuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
