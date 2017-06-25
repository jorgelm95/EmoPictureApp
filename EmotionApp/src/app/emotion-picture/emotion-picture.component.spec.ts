import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionPictureComponent } from './emotion-picture.component';

describe('EmotionPictureComponent', () => {
  let component: EmotionPictureComponent;
  let fixture: ComponentFixture<EmotionPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
