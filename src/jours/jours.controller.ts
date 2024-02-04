import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { JoursService } from './jours.service'
import { CreateJourDto } from './dto/create-jour.dto'
import { JourEntity } from './entities/jour.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('jours')
export class JoursController {
    constructor(private readonly joursService: JoursService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async create(@Body() createJourDto: CreateJourDto) {
        const jour = await this.joursService.create(createJourDto)
        return new JourEntity(jour)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const jours = await this.joursService.findAll()
        return jours.map((jour) => new JourEntity(jour))
    }

    @Get('/festival/:year')
    @UseGuards(JwtAuthGuard)
    async findAllByFestival(@Param('year', ParseIntPipe) year: number) {
        const jours = await this.joursService.findAllByFestival(year)
        return jours.map((jour) => new JourEntity(jour))
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.joursService.remove(id)
    }
}
