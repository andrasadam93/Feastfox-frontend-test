import { TestBed } from '@angular/core/testing';

import { GetweatherService } from './getweather.service';

describe('GetweatherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetweatherService = TestBed.get(GetweatherService);
    expect(service).toBeTruthy();
  });
});
