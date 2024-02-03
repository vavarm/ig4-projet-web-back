import { Module } from '@nestjs/common'
import { PostesService } from './postes.service'
import { PostesController } from './postes.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    controllers: [PostesController],
    providers: [PostesService],
    imports: [PrismaModule],
    exports: [PostesService]
})
export class PostesModule { }
