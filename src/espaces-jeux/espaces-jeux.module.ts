import { Module } from '@nestjs/common'
import { EspacesJeuxService } from './espaces-jeux.service'
import { EspacesJeuxController } from './espaces-jeux.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [EspacesJeuxController],
    providers: [EspacesJeuxService],
    imports: [PrismaModule],
    exports: [EspacesJeuxService]
})
export class EspacesJeuxModule { }
