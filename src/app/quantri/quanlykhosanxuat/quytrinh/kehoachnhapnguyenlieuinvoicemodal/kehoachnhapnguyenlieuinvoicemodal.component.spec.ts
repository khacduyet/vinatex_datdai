import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachnhapnguyenlieuinvoicemodalComponent } from './kehoachnhapnguyenlieuinvoicemodal.component';

describe('KehoachnhapnguyenlieuinvoicemodalComponent', () => {
  let component: KehoachnhapnguyenlieuinvoicemodalComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieuinvoicemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieuinvoicemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieuinvoicemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
