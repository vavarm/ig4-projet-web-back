import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenevolesService } from './benevoles.service';
import { CreateBenevoleDto } from './dto/create-benevole.dto';
import { UpdateBenevoleDto } from './dto/update-benevole.dto';

@Controller('benevoles')
export class BenevolesController {
  constructor(private readonly benevolesService: BenevolesService) {}

  @Post()
  create(@Body() createBenevoleDto: CreateBenevoleDto) {
    return this.benevolesService.create(createBenevoleDto);
  }

  @Get()
  findAll() {
    return this.benevolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.benevolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBenevoleDto: UpdateBenevoleDto) {
    return this.benevolesService.update(+id, updateBenevoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.benevolesService.remove(+id);
  }
}
