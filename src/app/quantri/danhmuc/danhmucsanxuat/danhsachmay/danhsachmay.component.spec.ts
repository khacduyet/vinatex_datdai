import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachmayComponent } from './danhsachmay.component';

describe('DanhsachmayComponent', () => {
  let component: DanhsachmayComponent;
  let fixture: ComponentFixture<DanhsachmayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachmayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachmayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
