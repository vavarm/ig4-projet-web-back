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
import { FestivalsService } from './festivals.service'
import { CreateFestivalDto } from './dto/create-festival.dto'
import { FestivalEntity } from './entities/festival.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'

@Controller('festivals')
export class FestivalsController {
    constructor(private readonly festivalsService: FestivalsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async create(@Body() createFestivalDto: CreateFestivalDto) {
        console.log(createFestivalDto)
        const festival = await this.festivalsService.create(createFestivalDto)
        return new FestivalEntity(festival)
    }

    @Get()
    async findAll() {
        const festivals = await this.festivalsService.findAll()
        return festivals.map((festival) => new FestivalEntity(festival))
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const festival = await this.festivalsService.findOne(id)
        return new FestivalEntity(festival)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async remove(@Param('id', ParseIntPipe) id: number) {
        const festival = await this.festivalsService.remove(id)
        return new FestivalEntity(festival)
    }
}
