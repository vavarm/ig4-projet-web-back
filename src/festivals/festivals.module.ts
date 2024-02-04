import { Module } from '@nestjs/common'
import { FestivalsService } from './festivals.service'
import { FestivalsController } from './festivals.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [FestivalsController],
    providers: [FestivalsService],
    imports: [PrismaModule],
    exports: [FestivalsService]
})
export class FestivalsModule { }
