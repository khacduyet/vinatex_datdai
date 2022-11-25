import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomkhoComponent } from './nhomkho.component';

describe('NhomkhoComponent', () => {
  let component: NhomkhoComponent;
  let fixture: ComponentFixture<NhomkhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
