import { TestBed } from '@angular/core/testing';

import { UserFirebaseService } from './user-firebase.service';

describe('UserFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFirebaseService = TestBed.get(UserFirebaseService);
    expect(service).toBeTruthy();
  });
});
