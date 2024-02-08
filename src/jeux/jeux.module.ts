import { Module } from '@nestjs/common'
import { JeuxService } from './jeux.service'
import { JeuxController } from './jeux.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [JeuxController],
    providers: [JeuxService],
    imports: [PrismaModule],
    exports: [JeuxService]
})
export class JeuxModule { }
