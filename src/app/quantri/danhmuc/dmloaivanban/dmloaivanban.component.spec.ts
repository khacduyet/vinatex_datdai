import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmloaivanbanComponent } from './dmloaivanban.component';

describe('DmloaivanbanComponent', () => {
  let component: DmloaivanbanComponent;
  let fixture: ComponentFixture<DmloaivanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmloaivanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmloaivanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
