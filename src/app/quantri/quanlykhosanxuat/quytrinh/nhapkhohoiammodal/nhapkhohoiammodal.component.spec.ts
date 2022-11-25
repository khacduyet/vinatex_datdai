import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhohoiammodalComponent } from './nhapkhohoiammodal.component';

describe('NhapkhohoiammodalComponent', () => {
  let component: NhapkhohoiammodalComponent;
  let fixture: ComponentFixture<NhapkhohoiammodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhohoiammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhohoiammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
