import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmtaisanComponent } from './modaldmtaisan.component';

describe('ModaldmtaisanComponent', () => {
  let component: ModaldmtaisanComponent;
  let fixture: ComponentFixture<ModaldmtaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
