import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSoDoComponent } from './crud-so-do.component';

describe('CrudSoDoComponent', () => {
  let component: CrudSoDoComponent;
  let fixture: ComponentFixture<CrudSoDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudSoDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudSoDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
