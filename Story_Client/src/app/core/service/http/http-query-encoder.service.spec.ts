import { TestBed, inject } from '@angular/core/testing';

import { HttpQueryEncoderService } from './http-query-encoder.service';

describe('HttpQueryEncoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpQueryEncoderService]
    });
  });

  it('should ...', inject([HttpQueryEncoderService], (service: HttpQueryEncoderService) => {
    expect(service).toBeTruthy();
  }));
});
