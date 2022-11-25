import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HienTrangSuDungComponent } from './hien-trang-su-dung.component';

describe('HienTrangSuDungComponent', () => {
  let component: HienTrangSuDungComponent;
  let fixture: ComponentFixture<HienTrangSuDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HienTrangSuDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HienTrangSuDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
