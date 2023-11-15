import { Test, TestingModule } from '@nestjs/testing';
import { BenevolesService } from './benevoles.service';

describe('BenevolesService', () => {
  let service: BenevolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BenevolesService],
    }).compile();

    service = module.get<BenevolesService>(BenevolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
