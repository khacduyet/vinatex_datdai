import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalphuongansapxepComponent } from './modalphuongansapxep.component';

describe('ModalphuongansapxepComponent', () => {
  let component: ModalphuongansapxepComponent;
  let fixture: ComponentFixture<ModalphuongansapxepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalphuongansapxepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalphuongansapxepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
