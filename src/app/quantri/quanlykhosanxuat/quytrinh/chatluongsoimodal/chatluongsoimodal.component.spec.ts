import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatluongsoimodalComponent } from './chatluongsoimodal.component';

describe('ChatluongsoimodalComponent', () => {
  let component: ChatluongsoimodalComponent;
  let fixture: ComponentFixture<ChatluongsoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatluongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatluongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
