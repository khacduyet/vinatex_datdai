import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanluongchitietComponent } from './sanluongchitiet.component';

describe('SanluongchitietComponent', () => {
  let component: SanluongchitietComponent;
  let fixture: ComponentFixture<SanluongchitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanluongchitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanluongchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
