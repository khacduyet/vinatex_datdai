import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmnguongocdatComponent } from './dmnguongocdat.component';

describe('DmnguongocdatComponent', () => {
  let component: DmnguongocdatComponent;
  let fixture: ComponentFixture<DmnguongocdatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmnguongocdatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmnguongocdatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
