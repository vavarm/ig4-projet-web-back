import { Module } from '@nestjs/common'
import { InscriptionsService } from './inscriptions.service'
import { InscriptionsController } from './inscriptions.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [InscriptionsController],
    providers: [InscriptionsService],
    imports: [PrismaModule],
    exports: [InscriptionsService]
})
export class InscriptionsModule { }
