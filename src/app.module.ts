import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenevolesModule } from './benevoles/benevoles.module';

@Module({
  imports: [BenevolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
