import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuongComponent } from './phuong.component';

describe('PhuongComponent', () => {
  let component: PhuongComponent;
  let fixture: ComponentFixture<PhuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
