import { Module } from '@nestjs/common';
import { BenevolesService } from './benevoles.service';
import { BenevolesController } from './benevoles.controller';

@Module({
  controllers: [BenevolesController],
  providers: [BenevolesService],
})
export class BenevolesModule {}
