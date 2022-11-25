import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtieuchichatluongsoimodalComponent } from './dmtieuchichatluongsoimodal.component';

describe('DmtieuchichatluongsoimodalComponent', () => {
  let component: DmtieuchichatluongsoimodalComponent;
  let fixture: ComponentFixture<DmtieuchichatluongsoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtieuchichatluongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtieuchichatluongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
