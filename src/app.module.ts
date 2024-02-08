import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BenevolesModule } from './benevoles/benevoles.module'
import { AuthModule } from './auth/auth.module'
import { AssociationsModule } from './associations/associations.module'
import { FestivalsModule } from './festivals/festivals.module'
import { InscriptionsModule } from './inscriptions/inscriptions.module'
import { PostesModule } from './postes/postes.module'
import { JoursModule } from './jours/jours.module'
import { CreneauHoraireModule } from './creneaux-horaire/creneaux-horaire.module'
import { EspacesModule } from './espaces/espaces.module'
import { PlanningsEspacesModule } from './planningsEspaces/plannings-espaces.module'
import { JeuxModule } from './jeux/jeux.module'
import { EspacesJeuxModule } from './espaces-jeux/espaces-jeux.module'

@Module({
  imports: [
    BenevolesModule,
    AuthModule,
    AssociationsModule,
    FestivalsModule,
    InscriptionsModule,
    PostesModule,
    JoursModule,
    CreneauHoraireModule,
    EspacesModule,
    PlanningsEspacesModule,
    JeuxModule,
    EspacesJeuxModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
