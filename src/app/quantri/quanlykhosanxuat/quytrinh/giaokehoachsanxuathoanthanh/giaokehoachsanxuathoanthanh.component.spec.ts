import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaokehoachsanxuathoanthanhComponent } from './giaokehoachsanxuathoanthanh.component';

describe('GiaokehoachsanxuathoanthanhComponent', () => {
  let component: GiaokehoachsanxuathoanthanhComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuathoanthanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuathoanthanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuathoanthanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
