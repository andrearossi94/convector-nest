import { Test, TestingModule } from '@nestjs/testing';
import { PersonaleController } from './personale.controller';

describe('Personale Controller', () => {
  let controller: PersonaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaleController],
    }).compile();

    controller = module.get<PersonaleController>(PersonaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
