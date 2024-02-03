import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BenevolesModule } from './benevoles/benevoles.module'
import { AuthModule } from './auth/auth.module'
import { AssociationsModule } from './associations/associations.module'
import { FestivalsModule } from './festival/festivals.module'
import { InscriptionsModule } from './inscriptions/inscriptions.module'
import { PostesModule } from './postes/postes.module'

@Module({
  imports: [BenevolesModule, AuthModule, AssociationsModule, FestivalsModule, InscriptionsModule, PostesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
