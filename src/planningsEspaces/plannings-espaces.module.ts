import { Module } from '@nestjs/common'
import { PlanningsEspacesService } from './plannings-espaces.service'
import { PlanningsEspacesController } from './plannings-espaces.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [PlanningsEspacesController],
    providers: [PlanningsEspacesService],
    imports: [PrismaModule],
    exports: [PlanningsEspacesService]
})
export class PlanningsEspacesModule { }
