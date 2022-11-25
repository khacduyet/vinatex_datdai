import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmhinhthucxulyComponent } from './dmhinhthucxuly.component';

describe('DmhinhthucxulyComponent', () => {
  let component: DmhinhthucxulyComponent;
  let fixture: ComponentFixture<DmhinhthucxulyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmhinhthucxulyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmhinhthucxulyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
