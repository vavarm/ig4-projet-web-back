import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BenevolesModule } from './benevoles/benevoles.module'
import { AssociationsModule } from './associations/associations.module'

@Module({
  imports: [BenevolesModule, AssociationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
