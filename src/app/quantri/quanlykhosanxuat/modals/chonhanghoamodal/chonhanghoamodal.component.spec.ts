import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonhanghoamodalComponent } from './chonhanghoamodal.component';

describe('ChonhanghoamodalComponent', () => {
  let component: ChonhanghoamodalComponent;
  let fixture: ComponentFixture<ChonhanghoamodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonhanghoamodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonhanghoamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
