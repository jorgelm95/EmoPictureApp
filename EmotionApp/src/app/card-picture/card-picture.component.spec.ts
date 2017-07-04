import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPictureComponent } from './card-picture.component';

describe('CardPictureComponent', () => {
  let component: CardPictureComponent;
  let fixture: ComponentFixture<CardPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
