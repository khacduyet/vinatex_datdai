import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaisoiComponent } from './loaisoi.component';

describe('LoaisoiComponent', () => {
  let component: LoaisoiComponent;
  let fixture: ComponentFixture<LoaisoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaisoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaisoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
