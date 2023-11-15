import { Test, TestingModule } from '@nestjs/testing';
import { BenevolesController } from './benevoles.controller';
import { BenevolesService } from './benevoles.service';

describe('BenevolesController', () => {
  let controller: BenevolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenevolesController],
      providers: [BenevolesService],
    }).compile();

    controller = module.get<BenevolesController>(BenevolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
