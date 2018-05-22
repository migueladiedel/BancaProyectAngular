import { TestBed, inject } from '@angular/core/testing';

import { TarjetasVmService } from './tarjetas-vm.service';

describe('TarjetasVmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarjetasVmService]
    });
  });

  it('should be created', inject([TarjetasVmService], (service: TarjetasVmService) => {
    expect(service).toBeTruthy();
  }));
});
