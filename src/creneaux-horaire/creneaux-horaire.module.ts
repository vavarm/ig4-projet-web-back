import { Module } from '@nestjs/common'
import { CreneauxHoraireService } from './creneaux-horaire.service'
import { CreneauxHoraireController } from './creneaux-horaire.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [CreneauxHoraireController],
    providers: [CreneauxHoraireService],
    imports: [PrismaModule],
    exports: [CreneauxHoraireService]
})
export class CreneauHoraireModule { }