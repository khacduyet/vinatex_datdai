import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachxuathangComponent } from './kehoachxuathang.component';

describe('KehoachxuathangComponent', () => {
  let component: KehoachxuathangComponent;
  let fixture: ComponentFixture<KehoachxuathangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachxuathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachxuathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
