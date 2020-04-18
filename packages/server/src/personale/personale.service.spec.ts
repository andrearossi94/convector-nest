import { Test, TestingModule } from '@nestjs/testing';
import { PersonaleService } from './personale.service';

describe('PersonaleService', () => {
  let service: PersonaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonaleService],
    }).compile();

    service = module.get<PersonaleService>(PersonaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
