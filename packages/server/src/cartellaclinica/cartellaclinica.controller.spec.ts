import { Test, TestingModule } from '@nestjs/testing';
import { CartellaclinicaController } from './cartellaclinica.controller';

describe('Cartellaclinica Controller', () => {
  let controller: CartellaclinicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartellaclinicaController],
    }).compile();

    controller = module.get<CartellaclinicaController>(CartellaclinicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
