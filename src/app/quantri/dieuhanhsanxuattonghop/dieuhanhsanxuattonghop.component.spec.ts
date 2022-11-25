import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuhanhsanxuattonghopComponent } from './dieuhanhsanxuattonghop.component';

describe('DieuhanhsanxuattonghopComponent', () => {
  let component: DieuhanhsanxuattonghopComponent;
  let fixture: ComponentFixture<DieuhanhsanxuattonghopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuhanhsanxuattonghopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuhanhsanxuattonghopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
