import { Injectable } from '@nestjs/common'
import { CreateBenevoleDto } from './dto/create-benevole.dto'
import { UpdateBenevoleDto } from './dto/update-benevole.dto'
import { UpdateBenevoleAdminDto } from './dto/update-benevole.admin.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

const roundsOfHashingPassword = parseInt(process.env.ROUNDS_OF_HASHING)

@Injectable()
export class BenevolesService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createBenevoleDto: CreateBenevoleDto) {
    createBenevoleDto.password = await bcrypt.hash(createBenevoleDto.password, roundsOfHashingPassword)
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
    if (!await this.prisma.benevole.findUnique({ where: { id } })) {
      return null
    }
    if (updateBenevoleDto.password != undefined) {
      updateBenevoleDto.password = await bcrypt.hash(updateBenevoleDto.password, roundsOfHashingPassword)
    }
    if (updateBenevoleDto.associations === undefined) {
      updateBenevoleDto.associations = []
    }

    return this.prisma.benevole.update({
      where: { id },
      data: {
        ...updateBenevoleDto,
        associations: {
          connect: updateBenevoleDto.associations
        }
      }
    })
  }

  async updateAdmin(id: number, updateBenevoleAdminDto: UpdateBenevoleAdminDto) {
    if (!await this.prisma.benevole.findUnique({ where: { id } })) {
      return null
    }
    if (updateBenevoleAdminDto.password != undefined) {
      updateBenevoleAdminDto.password = await bcrypt.hash(updateBenevoleAdminDto.password, roundsOfHashingPassword)
    }
    if (updateBenevoleAdminDto.associations === undefined) {
      updateBenevoleAdminDto.associations = []
    }

    return this.prisma.benevole.update({
      where: { id },
      data: {
        ...updateBenevoleAdminDto,
        associations: {
          connect: updateBenevoleAdminDto.associations
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
