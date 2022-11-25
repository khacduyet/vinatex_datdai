import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmdonviComponent } from './modaldmdonvi.component';

describe('ModaldmdonviComponent', () => {
  let component: ModaldmdonviComponent;
  let fixture: ComponentFixture<ModaldmdonviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmdonviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmdonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
