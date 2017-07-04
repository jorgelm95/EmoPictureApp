import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPictureDetailComponent } from './card-picture-detail.component';

describe('CardPictureDetailComponent', () => {
  let component: CardPictureDetailComponent;
  let fixture: ComponentFixture<CardPictureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPictureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPictureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
