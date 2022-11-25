import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieudieuchinhComponent } from './phieudieuchinh.component';

describe('PhieudieuchinhComponent', () => {
  let component: PhieudieuchinhComponent;
  let fixture: ComponentFixture<PhieudieuchinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieudieuchinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieudieuchinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
