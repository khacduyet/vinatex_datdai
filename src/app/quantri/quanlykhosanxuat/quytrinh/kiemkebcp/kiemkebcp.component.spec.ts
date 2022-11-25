import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkebcpComponent } from './kiemkebcp.component';

describe('KiemkebcpComponent', () => {
  let component: KiemkebcpComponent;
  let fixture: ComponentFixture<KiemkebcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkebcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkebcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
