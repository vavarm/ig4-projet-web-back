import { Module } from '@nestjs/common'
import { EspacesService } from './espaces.service'
import { EspacesController } from './espaces.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [EspacesController],
    providers: [EspacesService],
    imports: [PrismaModule],
    exports: [EspacesService]
})
export class EspacesModule { }
