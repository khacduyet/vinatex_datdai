import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardthongluongComponent } from './dashboardthongluong.component';

describe('DashboardthongluongComponent', () => {
  let component: DashboardthongluongComponent;
  let fixture: ComponentFixture<DashboardthongluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardthongluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardthongluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
