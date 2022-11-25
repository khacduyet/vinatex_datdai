import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHienTrangSuDungComponent } from './crud-hien-trang-su-dung.component';

describe('CrudHienTrangSuDungComponent', () => {
  let component: CrudHienTrangSuDungComponent;
  let fixture: ComponentFixture<CrudHienTrangSuDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudHienTrangSuDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHienTrangSuDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
