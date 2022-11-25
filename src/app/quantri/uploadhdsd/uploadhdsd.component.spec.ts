import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadhdsdComponent } from './uploadhdsd.component';

describe('UploadhdsdComponent', () => {
  let component: UploadhdsdComponent;
  let fixture: ComponentFixture<UploadhdsdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadhdsdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadhdsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
