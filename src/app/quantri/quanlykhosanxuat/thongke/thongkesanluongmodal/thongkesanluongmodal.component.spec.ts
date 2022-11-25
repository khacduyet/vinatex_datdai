import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkesanluongmodalComponent } from './thongkesanluongmodal.component';

describe('ThongkesanluongmodalComponent', () => {
  let component: ThongkesanluongmodalComponent;
  let fixture: ComponentFixture<ThongkesanluongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
