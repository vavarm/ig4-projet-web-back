import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { AssociationsService } from './associations.service'
import { CreateAssociationDto } from './dto/create-association.dto'
import { UpdateAssociationDto } from './dto/update-association.dto'
import { AssociationEntity } from './entities/association.entity'

@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) { }

  @Post()
  async create(@Body() createAssociationDto: CreateAssociationDto) {
    const association = await this.associationsService.create(createAssociationDto)
    return new AssociationEntity(association)
  }

  @Get()
  async findAll() {
    const associations = await this.associationsService.findAll()
    return associations.map((association) => new AssociationEntity(association))
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const association = await this.associationsService.findOne(id)
    return new AssociationEntity(association)
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAssociationDto: UpdateAssociationDto) {
    const association = await this.associationsService.update(id, updateAssociationDto)
    return new AssociationEntity(association)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const association = await this.associationsService.remove(id)
    return new AssociationEntity(association)
  }
}
