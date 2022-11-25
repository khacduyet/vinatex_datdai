import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltinhComponent } from './modaltinh.component';

describe('ModaltinhComponent', () => {
  let component: ModaltinhComponent;
  let fixture: ComponentFixture<ModaltinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
