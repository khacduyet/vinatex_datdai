import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchitietthuadatComponent } from './modalchitietthuadat.component';

describe('ModalchitietthuadatComponent', () => {
  let component: ModalchitietthuadatComponent;
  let fixture: ComponentFixture<ModalchitietthuadatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchitietthuadatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchitietthuadatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
