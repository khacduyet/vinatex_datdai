import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaokehoachsanxuathoanthanhmodalComponent } from './giaokehoachsanxuathoanthanhmodal.component';

describe('GiaokehoachsanxuathoanthanhmodalComponent', () => {
  let component: GiaokehoachsanxuathoanthanhmodalComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuathoanthanhmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuathoanthanhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuathoanthanhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
