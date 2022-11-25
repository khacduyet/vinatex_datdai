import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkebcpmodalComponent } from './kiemkebcpmodal.component';

describe('KiemkebcpmodalComponent', () => {
  let component: KiemkebcpmodalComponent;
  let fixture: ComponentFixture<KiemkebcpmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkebcpmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkebcpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
