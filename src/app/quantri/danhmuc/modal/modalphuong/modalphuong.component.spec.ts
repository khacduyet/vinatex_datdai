import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalphuongComponent } from './modalphuong.component';

describe('ModalphuongComponent', () => {
  let component: ModalphuongComponent;
  let fixture: ComponentFixture<ModalphuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalphuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalphuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
