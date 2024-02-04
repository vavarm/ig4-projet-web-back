import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Patch,
} from '@nestjs/common'
import { EspacesService } from './espaces.service'
import { CreateEspaceDto } from './dto/create-espace.dto'
import { UpdateEspaceDto } from './dto/update-espace.dto'
import { EspaceEntity } from './entity/espace.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('espaces')
export class EspacesController {
    constructor(private readonly espacesService: EspacesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async create(@Body() createEspaceDto: CreateEspaceDto) {
        const espace = await this.espacesService.create(createEspaceDto)
        return new EspaceEntity(espace)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const espaces = await this.espacesService.findAll()
        return espaces.map((espace) => new EspaceEntity(espace))
    }

    @Get('/festival/:year')
    @UseGuards(JwtAuthGuard)
    async findAllByFestival(@Param('year', ParseIntPipe) year: number) {
        const espaces = await this.espacesService.findAllByFestival(year)
        return espaces.map((espace) => new EspaceEntity(espace))
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateEspaceDto: UpdateEspaceDto) {
        const espace = await this.espacesService.update(id, updateEspaceDto)
        return new EspaceEntity(espace)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.espacesService.remove(id)
    }
}
