import { Injectable } from '@nestjs/common'
import { CreateBenevoleDto } from './dto/create-benevole.dto'
import { UpdateBenevoleDto } from './dto/update-benevole.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BenevolesService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createBenevoleDto: CreateBenevoleDto) {
    return this.prisma.benevole.create({
      data: createBenevoleDto
    })
  }

  async findAll() {
    return this.prisma.benevole.findMany()
  }

  async findOne(id: string) {
    return this.prisma.benevole.findUnique({
      where: { id }
    })
  }

  async update(id: string, updateBenevoleDto: UpdateBenevoleDto) {
    return this.prisma.benevole.update({
      where: { id },
      data: updateBenevoleDto
    })
  }

  async remove(id: string) {
    return this.prisma.benevole.delete({
      where: { id }
    })
  }
}
