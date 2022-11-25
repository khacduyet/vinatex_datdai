import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongsochatluongmodalComponent } from './thongsochatluongmodal.component';

describe('ThongsochatluongmodalComponent', () => {
  let component: ThongsochatluongmodalComponent;
  let fixture: ComponentFixture<ThongsochatluongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongsochatluongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongsochatluongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
