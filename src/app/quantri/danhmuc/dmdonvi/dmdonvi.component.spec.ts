import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmdonviComponent } from './dmdonvi.component';

describe('DmdonviComponent', () => {
  let component: DmdonviComponent;
  let fixture: ComponentFixture<DmdonviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmdonviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmdonviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
