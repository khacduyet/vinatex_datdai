import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkekhomodalComponent } from './kiemkekhomodal.component';

describe('KiemkekhomodalComponent', () => {
  let component: KiemkekhomodalComponent;
  let fixture: ComponentFixture<KiemkekhomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
