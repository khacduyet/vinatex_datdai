import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmkhoComponent } from './modaldmkho.component';

describe('ModaldmkhoComponent', () => {
  let component: ModaldmkhoComponent;
  let fixture: ComponentFixture<ModaldmkhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
