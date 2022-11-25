import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitrimodalComponent } from './vitrimodal.component';

describe('VitrimodalComponent', () => {
  let component: VitrimodalComponent;
  let fixture: ComponentFixture<VitrimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitrimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitrimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
