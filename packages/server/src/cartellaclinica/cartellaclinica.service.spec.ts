import { Test, TestingModule } from '@nestjs/testing';
import { CartellaclinicaService } from './cartellaclinica.service';

describe('CartellaclinicaService', () => {
  let service: CartellaclinicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartellaclinicaService],
    }).compile();

    service = module.get<CartellaclinicaService>(CartellaclinicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
