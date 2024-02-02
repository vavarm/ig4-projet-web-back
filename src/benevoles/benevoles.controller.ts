import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { BenevolesService } from './benevoles.service'
import { CreateBenevoleDto } from './dto/create-benevole.dto'
import { UpdateBenevoleDto } from './dto/update-benevole.dto'
import { UpdateBenevoleAdminDto } from './dto/update-benevole.admin.dto'
import { BenevoleEntity } from './entities/benevole.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('benevoles')
export class BenevolesController {
  constructor(private readonly benevolesService: BenevolesService) { }

  @Post()
  async create(@Body() createBenevoleDto: CreateBenevoleDto) {
    console.log(createBenevoleDto)
    const benevole = await this.benevolesService.create(createBenevoleDto)
    return new BenevoleEntity(benevole)
  }

  @Get()
  async findAll() {
    const benevoles = await this.benevolesService.findAll()
    return benevoles.map((benevole) => new BenevoleEntity(benevole))
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const benevole = await this.benevolesService.findOne(id)
    return new BenevoleEntity(benevole)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateBenevoleDto: UpdateBenevoleDto) {
    const benevole = await this.benevolesService.update(id, updateBenevoleDto)
    return new BenevoleEntity(benevole)
  }

  @Patch('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EnumRole.Admin)
  async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() updateBenevoleAdminDto: UpdateBenevoleAdminDto) {
    const benevole = await this.benevolesService.updateAdmin(id, updateBenevoleAdminDto)
    return new BenevoleEntity(benevole)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const benevole = await this.benevolesService.remove(id)
    return new BenevoleEntity(benevole)
  }
}
