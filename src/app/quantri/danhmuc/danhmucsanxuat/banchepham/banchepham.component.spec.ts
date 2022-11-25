import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanchephamComponent } from './banchepham.component';

describe('BanchephamComponent', () => {
  let component: BanchephamComponent;
  let fixture: ComponentFixture<BanchephamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanchephamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanchephamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
