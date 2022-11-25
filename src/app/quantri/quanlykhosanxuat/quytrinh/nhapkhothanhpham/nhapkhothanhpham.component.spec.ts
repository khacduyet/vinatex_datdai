import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhothanhphamComponent } from './nhapkhothanhpham.component';

describe('NhapkhothanhphamComponent', () => {
  let component: NhapkhothanhphamComponent;
  let fixture: ComponentFixture<NhapkhothanhphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhothanhphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhothanhphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
