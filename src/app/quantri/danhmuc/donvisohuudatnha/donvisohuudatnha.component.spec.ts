import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonvisohuudatnhaComponent } from './donvisohuudatnha.component';

describe('DonvisohuudatnhaComponent', () => {
  let component: DonvisohuudatnhaComponent;
  let fixture: ComponentFixture<DonvisohuudatnhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonvisohuudatnhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonvisohuudatnhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
