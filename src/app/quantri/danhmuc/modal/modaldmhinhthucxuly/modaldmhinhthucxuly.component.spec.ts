import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmhinhthucxulyComponent } from './modaldmhinhthucxuly.component';

describe('ModaldmhinhthucxulyComponent', () => {
  let component: ModaldmhinhthucxulyComponent;
  let fixture: ComponentFixture<ModaldmhinhthucxulyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmhinhthucxulyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmhinhthucxulyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
