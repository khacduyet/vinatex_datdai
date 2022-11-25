import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmhientrangsudungComponent } from './dmhientrangsudung.component';

describe('DmhientrangsudungComponent', () => {
  let component: DmhientrangsudungComponent;
  let fixture: ComponentFixture<DmhientrangsudungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmhientrangsudungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmhientrangsudungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
