import { Module } from '@nestjs/common';
import { BenevolesService } from './benevoles.service';
import { BenevolesController } from './benevoles.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [BenevolesController],
  providers: [BenevolesService],
  imports: [PrismaModule],
  exports: [BenevolesService]
})
export class BenevolesModule {}
