import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Req
} from '@nestjs/common'
import { PlanningsEspacesService } from './plannings-espaces.service'
import { CreatePlanningEspaceDto } from './dto/create-planning-espace.dto'
import { PlanningEspaceEntity } from './entity/planning-espace.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PlanningsEspacesGuard } from './guards/plannings-espaces.guard'
import { Request } from 'express'

@Controller('plannings-espaces')
export class PlanningsEspacesController {
    constructor(private readonly planningsEspacesService: PlanningsEspacesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, PlanningsEspacesGuard)
    async create(@Body() createPlanningEspaceDto: CreatePlanningEspaceDto) {
        const planningEspace = await this.planningsEspacesService.create(createPlanningEspaceDto)
        return new PlanningEspaceEntity(planningEspace)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        const planningsEspaces = await this.planningsEspacesService.findAll()
        return planningsEspaces
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const planningEspace = await this.planningsEspacesService.findOne(id)
        return planningEspace
    }

    @Get('benevole/:idBenevole/espace/:idEspace')
    @UseGuards(JwtAuthGuard)
    async findAllByBenevoleAndEspace(@Param('idBenevole', ParseIntPipe) idBenevole: number, @Param('idEspace', ParseIntPipe) idEspace: number) {
        const planningsEspaces = await this.planningsEspacesService.findAllByBenevoleAndEspace(idBenevole, idEspace)
        return planningsEspaces
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const planningEspace = await this.planningsEspacesService.remove(id, req.user)
        return new PlanningEspaceEntity(planningEspace)
    }
}
