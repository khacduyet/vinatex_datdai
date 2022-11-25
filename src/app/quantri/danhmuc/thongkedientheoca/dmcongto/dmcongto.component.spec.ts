import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcongtoComponent } from './dmcongto.component';

describe('DmcongtoComponent', () => {
  let component: DmcongtoComponent;
  let fixture: ComponentFixture<DmcongtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcongtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcongtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
