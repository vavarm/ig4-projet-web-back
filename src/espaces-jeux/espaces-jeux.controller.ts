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
import { EspacesJeuxService } from './espaces-jeux.service'
import { CreateEspaceJeuDto } from './dto/create-espace-jeu.dto'
import { EspaceJeuEntity } from './entities/espace-jeu-entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('espaces-jeux')
export class EspacesJeuxController {
    constructor(private readonly espacesJeuxService: EspacesJeuxService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async create(@Body() createEspaceJeuDto: CreateEspaceJeuDto) {
        const espaceJeu = await this.espacesJeuxService.create(createEspaceJeuDto)
        return new EspaceJeuEntity(espaceJeu)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const espacesJeux = await this.espacesJeuxService.findAll()
        return espacesJeux.map((espaceJeu) => new EspaceJeuEntity(espaceJeu))
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const espaceJeu = await this.espacesJeuxService.findOne(id)
        return new EspaceJeuEntity(espaceJeu)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async remove(@Param('id', ParseIntPipe) id: number) {
        const espaceJeu = await this.espacesJeuxService.remove(id)
        return new EspaceJeuEntity(espaceJeu)
    }
}
