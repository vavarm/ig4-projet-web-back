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
import { CreneauxHoraireService } from './creneaux-horaire.service'
import { CreateCreneauHoraireDto } from './dto/create-creneau-horaire.dto'
import { CreneauHoraireEntity } from './entities/creneau-horaire.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('creneaux-horaire')
export class CreneauxHoraireController {
    constructor(private readonly creneauxHoraireService: CreneauxHoraireService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async create(@Body() createCreneauHoraireDto: CreateCreneauHoraireDto) {
        const creneauHoraire = await this.creneauxHoraireService.create(createCreneauHoraireDto)
        return new CreneauHoraireEntity(creneauHoraire)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const creneauxHoraires = await this.creneauxHoraireService.findAll()
        return creneauxHoraires.map((creneauHoraire) => new CreneauHoraireEntity(creneauHoraire))
    }

    @Get('/festival/:year')
    @UseGuards(JwtAuthGuard)
    async findAllByFestival(@Param('year', ParseIntPipe) year: number) {
        const creneauxHoraires = await this.creneauxHoraireService.findAllByFestival(year)
        return creneauxHoraires.map((creneauHoraire) => new CreneauHoraireEntity(creneauHoraire))
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.creneauxHoraireService.remove(id)
    }
}
