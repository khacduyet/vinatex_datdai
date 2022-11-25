import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuhanhsanxuatComponent } from './dieuhanhsanxuat.component';

describe('DieuhanhsanxuatComponent', () => {
  let component: DieuhanhsanxuatComponent;
  let fixture: ComponentFixture<DieuhanhsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuhanhsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuhanhsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
