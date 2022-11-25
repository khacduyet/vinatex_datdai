import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongsochatluongComponent } from './thongsochatluong.component';

describe('ThongsochatluongComponent', () => {
  let component: ThongsochatluongComponent;
  let fixture: ComponentFixture<ThongsochatluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongsochatluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongsochatluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
