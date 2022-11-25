import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudThongTinChungComponent } from './crud-thong-tin-chung.component';

describe('CrudThongTinChungComponent', () => {
  let component: CrudThongTinChungComponent;
  let fixture: ComponentFixture<CrudThongTinChungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudThongTinChungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudThongTinChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
