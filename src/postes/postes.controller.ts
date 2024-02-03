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
import { PostesService } from './postes.service'
import { CreatePosteDto } from './dto/create-poste.dto'
import { PosteEntity } from './entities/poste.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('postes')
export class PostesController {
    constructor(private readonly postesService: PostesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async create(@Body() createPoste: CreatePosteDto) {
        const poste = await this.postesService.create(createPoste)
        return new PosteEntity(poste)
    }

    @Get()
    async findAll() {
        const postes = await this.postesService.findAll()
        return postes.map((poste) => new PosteEntity(poste))
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const poste = await this.postesService.findOne(id)
        return new PosteEntity(poste)
    }

    @Get('festival/:id')
    async findAllByFestival(@Param('id', ParseIntPipe) id: number) {
        const postes = await this.postesService.findAllByFestival(id)
        return postes.map((poste) => new PosteEntity(poste))
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async remove(@Param('id', ParseIntPipe) id: number) {
        const poste = await this.postesService.remove(id)
        return new PosteEntity(poste)
    }
}
