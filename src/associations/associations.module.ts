import { Module } from '@nestjs/common'
import { AssociationsController } from './associations.controller'
import { AssociationsService } from './associations.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  controllers: [AssociationsController],
  providers: [AssociationsService],
  imports: [PrismaModule]
})
export class AssociationsModule { }
