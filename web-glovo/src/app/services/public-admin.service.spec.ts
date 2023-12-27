import { TestBed } from '@angular/core/testing';

import { PublicAdminService } from './public-admin.service';

describe('PublicAdminService', () => {
  let service: PublicAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
