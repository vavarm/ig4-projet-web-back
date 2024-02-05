import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { AssociationsService } from './associations.service'
import { CreateAssociationDto } from './dto/create-association.dto'
import { UpdateAssociationDto } from './dto/update-association.dto'
import { AssociationEntity } from './entities/association.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.Admin)
  async create(@Body() createAssociationDto: CreateAssociationDto) {
    const association = await this.associationsService.create(createAssociationDto)
    return new AssociationEntity(association)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const associations = await this.associationsService.findAll()
    return associations.map((association) => new AssociationEntity(association))
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const association = await this.associationsService.findOne(id)
    return new AssociationEntity(association)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAssociationDto: UpdateAssociationDto) {
    const association = await this.associationsService.update(id, updateAssociationDto)
    return new AssociationEntity(association)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const association = await this.associationsService.remove(id)
    return new AssociationEntity(association)
  }
}
