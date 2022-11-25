import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtaisanComponent } from './dmtaisan.component';

describe('DmtaisanComponent', () => {
  let component: DmtaisanComponent;
  let fixture: ComponentFixture<DmtaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
