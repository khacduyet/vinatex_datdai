import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkekhoComponent } from './kiemkekho.component';

describe('KiemkekhoComponent', () => {
  let component: KiemkekhoComponent;
  let fixture: ComponentFixture<KiemkekhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
