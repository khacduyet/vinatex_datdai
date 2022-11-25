import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachnhapnguyenlieuinvoiceComponent } from './kehoachnhapnguyenlieuinvoice.component';

describe('KehoachnhapnguyenlieuinvoiceComponent', () => {
  let component: KehoachnhapnguyenlieuinvoiceComponent;
  let fixture: ComponentFixture<KehoachnhapnguyenlieuinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapnguyenlieuinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapnguyenlieuinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
