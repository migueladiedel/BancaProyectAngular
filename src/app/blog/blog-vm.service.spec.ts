import { TestBed, inject } from '@angular/core/testing';

import { BlogVmService } from './blog-vm.service';

describe('BlogVmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogVmService]
    });
  });

  it('should be created', inject([BlogVmService], (service: BlogVmService) => {
    expect(service).toBeTruthy();
  }));
});
