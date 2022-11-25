import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanluongComponent } from './sanluong.component';

describe('SanluongComponent', () => {
  let component: SanluongComponent;
  let fixture: ComponentFixture<SanluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
