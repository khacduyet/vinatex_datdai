import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHsvbPhapQuyComponent } from './crud-hsvb-phap-quy.component';

describe('CrudHsvbPhapQuyComponent', () => {
  let component: CrudHsvbPhapQuyComponent;
  let fixture: ComponentFixture<CrudHsvbPhapQuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudHsvbPhapQuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHsvbPhapQuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
