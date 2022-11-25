import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanchephammodalComponent } from './banchephammodal.component';

describe('BanchephammodalComponent', () => {
  let component: BanchephammodalComponent;
  let fixture: ComponentFixture<BanchephammodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanchephammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanchephammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
