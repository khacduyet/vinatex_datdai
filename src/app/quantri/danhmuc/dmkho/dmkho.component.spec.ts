import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmkhoComponent } from './dmkho.component';

describe('DmkhoComponent', () => {
  let component: DmkhoComponent;
  let fixture: ComponentFixture<DmkhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
