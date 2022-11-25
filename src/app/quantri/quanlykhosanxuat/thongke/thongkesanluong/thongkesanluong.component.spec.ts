import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkesanluongComponent } from './thongkesanluong.component';

describe('ThongkesanluongComponent', () => {
  let component: ThongkesanluongComponent;
  let fixture: ComponentFixture<ThongkesanluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
