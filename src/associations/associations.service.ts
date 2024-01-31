import { Injectable } from '@nestjs/common'
import { CreateAssociationDto } from './dto/create-association.dto'
import { UpdateAssociationDto } from './dto/update-association.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AssociationsService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createAssociationDto: CreateAssociationDto) {
    return this.prisma.association.create({
      data: createAssociationDto
    })
  }

  async findAll() {
    return this.prisma.association.findMany()
  }

  async findOne(id: number) {
    return this.prisma.association.findUnique({
      where: { id }
    })
  }

  async update(id: number, updateAssociationDto: UpdateAssociationDto) {
    return this.prisma.association.update({
      where: { id },
      data: updateAssociationDto
    })
  }

  async remove(id: number) {
    return this.prisma.association.delete({
      where: { id }
    })
  }
}
