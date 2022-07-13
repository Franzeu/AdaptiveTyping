import { TestBed } from '@angular/core/testing';

import { SetusrdataService } from './setusrdata.service';

describe('SetusrdataService', () => {
  let service: SetusrdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetusrdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
