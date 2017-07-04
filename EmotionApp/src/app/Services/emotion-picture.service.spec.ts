import { TestBed, inject } from '@angular/core/testing';

import { EmotionPictureService } from './emotion-picture.service';

describe('EmotionPictureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmotionPictureService]
    });
  });

  it('should be created', inject([EmotionPictureService], (service: EmotionPictureService) => {
    expect(service).toBeTruthy();
  }));
});
