import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandoichuyenComponent } from './candoichuyen.component';

describe('CandoichuyenComponent', () => {
  let component: CandoichuyenComponent;
  let fixture: ComponentFixture<CandoichuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandoichuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandoichuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
