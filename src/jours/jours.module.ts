import { Module } from '@nestjs/common'
import { JoursService } from './jours.service'
import { JoursController } from './jours.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [JoursController],
    providers: [JoursService],
    imports: [PrismaModule],
    exports: [JoursService]
})
export class JoursModule { }
