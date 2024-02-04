import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { InscriptionsService } from './inscriptions.service'
import { CreateInscriptionDto } from './dto/create-inscription.dto'
import { UpdateInscriptionDto } from './dto/update-inscription.dto'
import { InscriptionEntity } from './entities/inscription.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/custom.decorator'
import { EnumRole } from '@prisma/client'
import { InscriptionsGuard } from './guards/inscriptions.guard'

@Controller('inscriptions')
export class InscriptionsController {
    constructor(private readonly inscriptionsService: InscriptionsService) { }

    @Post()
    @UseGuards(JwtAuthGuard, InscriptionsGuard)
    async create(@Body() createInscriptionDto: CreateInscriptionDto) {
        const inscription = await this.inscriptionsService.create(createInscriptionDto)
        return new InscriptionEntity(inscription)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const inscriptions = await this.inscriptionsService.findAll()
        return inscriptions.map((inscription) => new InscriptionEntity(inscription))
    }

    @Get('/festival/:id')
    @UseGuards(JwtAuthGuard)
    async findAllByFestival(@Param('id', ParseIntPipe) id: number) {
        const inscriptions = await this.inscriptionsService.findAllByFestival(id)
        return inscriptions.map((inscription) => new InscriptionEntity(inscription))
    }

    @Get('/benevole/:id')
    @UseGuards(JwtAuthGuard)
    async findAllByBenevole(@Param('id', ParseIntPipe) id: number) {
        const inscriptions = await this.inscriptionsService.findAllByBenevole(id)
        return inscriptions.map((inscription) => new InscriptionEntity(inscription))
    }

    @Patch('/benevole/:benevoleId/festival/:festivalYear')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(EnumRole.Admin)
    async update(
        @Param('benevoleId', ParseIntPipe) benevoleId: number,
        @Param('festivalYear', ParseIntPipe) festivalYear: number,
        @Body() updateInscriptionDto: UpdateInscriptionDto,
    ) {
        const inscription = await this.inscriptionsService.update(benevoleId, festivalYear, updateInscriptionDto)
        return new InscriptionEntity(inscription)
    }

    @Delete('/benevole/:benevoleId/festival/:festivalYear')
    @UseGuards(JwtAuthGuard, InscriptionsGuard)
    async remove(
        @Param('benevoleId', ParseIntPipe) benevoleId: number,
        @Param('festivalYear', ParseIntPipe) festivalYear: number,
    ) {
        const inscription = await this.inscriptionsService.remove(benevoleId, festivalYear)
        // TODO: delete all planning for this inscription
        return new InscriptionEntity(inscription)
    }
}
