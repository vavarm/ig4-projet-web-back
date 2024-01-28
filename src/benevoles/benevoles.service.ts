import { Injectable } from '@nestjs/common'
import { CreateBenevoleDto } from './dto/create-benevole.dto'
import { UpdateBenevoleDto } from './dto/update-benevole.dto'
import { UpdateBenevoleAdminDto } from './dto/update-benevole.admin.dto'
import { PrismaService } from '../prisma/prisma.service'
import { EnumTailleTShirt, EnumHebergement, EnumRole } from '@prisma/client'

@Injectable()
export class BenevolesService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createBenevoleDto: CreateBenevoleDto) {
    let associations = []
    if (createBenevoleDto.associations != undefined) {
      associations = createBenevoleDto.associations.map(association => ({ id: association.id }))
    }

    console.log(createBenevoleDto)

    return this.prisma.benevole.create({
      data: {
        ...createBenevoleDto,
        associations: {
          connect: associations
        }
      }
    })
  }

  async findAll() {
    return this.prisma.benevole.findMany({
      include: {
        associations: true
      }
    })
  }

  async findOne(id: number) {
    return this.prisma.benevole.findUnique({
      where: { id },
      include: {
        associations: true
      }
    })
  }

  async update(id: number, updateBenevoleDto: UpdateBenevoleDto) {
    let associations = []
    if (updateBenevoleDto.associations != undefined) {
      associations = updateBenevoleDto.associations.map(association => ({ id: association.id }))
    }

    return this.prisma.benevole.update({
      where: { id },
      data: {
        ...updateBenevoleDto,
        associations: {
          connect: associations
        }
      }
    })
  }

  async updateAdmin(id: number, updateBenevoleAdminDto: UpdateBenevoleAdminDto) {
    let associations = []
    if (updateBenevoleAdminDto.associations != undefined) {
      associations = updateBenevoleAdminDto.associations.map(association => ({ id: association.id }))
    }

    return this.prisma.benevole.update({
      where: { id },
      data: {
        ...updateBenevoleAdminDto,
        associations: {
          connect: associations
        }
      }
    })
  }

  async remove(id: number) {
    return this.prisma.benevole.delete({
      where: { id }
    })
  }
}
