import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanquyentheophanxuongmodalComponent } from './phanquyentheophanxuongmodal.component';

describe('PhanquyentheophanxuongmodalComponent', () => {
  let component: PhanquyentheophanxuongmodalComponent;
  let fixture: ComponentFixture<PhanquyentheophanxuongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhanquyentheophanxuongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhanquyentheophanxuongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
