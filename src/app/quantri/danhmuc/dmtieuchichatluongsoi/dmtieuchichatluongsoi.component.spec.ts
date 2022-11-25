import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtieuchichatluongsoiComponent } from './dmtieuchichatluongsoi.component';

describe('DmtieuchichatluongsoiComponent', () => {
  let component: DmtieuchichatluongsoiComponent;
  let fixture: ComponentFixture<DmtieuchichatluongsoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtieuchichatluongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtieuchichatluongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
