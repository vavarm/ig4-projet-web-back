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
import { JeuxService } from './jeux.service'
import { CreateJeuDto } from './dto/create-jeu.dto'
import { JeuEntity } from './entities/jeu.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('jeux')
export class JeuxController {
    constructor(private readonly jeuxService: JeuxService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async create(@Body() createJeuDto: CreateJeuDto) {
        const jeu = await this.jeuxService.create(createJeuDto)
        return new JeuEntity(jeu)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const jeux = await this.jeuxService.findAll()
        return jeux.map((jeu) => new JeuEntity(jeu))
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const jeu = await this.jeuxService.findOne(id)
        return new JeuEntity(jeu)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async remove(@Param('id', ParseIntPipe) id: number) {
        const jeu = await this.jeuxService.remove(id)
        return new JeuEntity(jeu)
    }
}
