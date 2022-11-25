import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhokhacmodalComponent } from './nhapkhokhacmodal.component';

describe('NhapkhokhacmodalComponent', () => {
  let component: NhapkhokhacmodalComponent;
  let fixture: ComponentFixture<NhapkhokhacmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhokhacmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhokhacmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
