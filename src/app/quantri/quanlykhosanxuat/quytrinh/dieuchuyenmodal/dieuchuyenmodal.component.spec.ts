import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuchuyenmodalComponent } from './dieuchuyenmodal.component';

describe('DieuchuyenmodalComponent', () => {
  let component: DieuchuyenmodalComponent;
  let fixture: ComponentFixture<DieuchuyenmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuchuyenmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuchuyenmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
