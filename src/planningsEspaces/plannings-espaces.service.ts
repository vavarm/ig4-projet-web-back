import { Injectable } from '@nestjs/common'
import { CreatePlanningEspaceDto } from './dto/create-planning-espace.dto'
import { PrismaService } from '../prisma/prisma.service'
import { BenevoleEntity } from '../benevoles/entities/benevole.entity'

@Injectable()
export class PlanningsEspacesService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createPlanningEspaceDto: CreatePlanningEspaceDto) {
        const occurences = await this.prisma.planningEspace.count({
            where: {
                espaceId: createPlanningEspaceDto.espaceId,
                benevoleId: createPlanningEspaceDto.benevoleId,
                creneauHoraireId: createPlanningEspaceDto.creneauHoraireId
            }
        })
        console.log(occurences)
        const flexible = occurences > 0 ? true : false
        const planningEspace = await this.prisma.planningEspace.create({
            data: {
                ...createPlanningEspaceDto,
                flexible
            }
        })
        // update all other planningsEspaces of the benevole for the same creneauHoraire and espace
        const planningsEspaces = await this.prisma.planningEspace.findMany({
            where: {
                benevoleId: createPlanningEspaceDto.benevoleId,
                creneauHoraireId: createPlanningEspaceDto.creneauHoraireId,
                espaceId: createPlanningEspaceDto.espaceId
            }
        })
        for (const otherPlanningEspace of planningsEspaces) {
            await this.prisma.planningEspace.update({
                where: { id: otherPlanningEspace.id },
                data: {
                    flexible: flexible
                }
            })
        }
        return planningEspace
    }

    async findAll() {
        const planningsEspaces = await this.prisma.planningEspace.findMany({
            include: {
                espace: true,
                benevole: true,
                creneauHoraire: true
            }
        })
        for (const planningEspace of planningsEspaces) {
            planningEspace.benevole = new BenevoleEntity(await this.prisma.benevole.findUnique({
                where: { id: planningEspace.benevoleId }
            }))
            planningEspace.espace = await this.prisma.espace.findUnique({
                where: { id: planningEspace.espaceId }
            })
            planningEspace.creneauHoraire = await this.prisma.creneauHoraire.findUnique({
                where: { id: planningEspace.creneauHoraireId }
            })
        }
        return planningsEspaces
    }

    async findOne(id: number) {
        const planningEspace = await this.prisma.planningEspace.findUnique({
            where: { id },
            include: {
                espace: true,
                benevole: true,
                creneauHoraire: true
            }
        })
        planningEspace.benevole = new BenevoleEntity(await this.prisma.benevole.findUnique({
            where: { id: planningEspace.benevoleId }
        }))
        planningEspace.espace = await this.prisma.espace.findUnique({
            where: { id: planningEspace.espaceId }
        })
        planningEspace.creneauHoraire = await this.prisma.creneauHoraire.findUnique({
            where: { id: planningEspace.creneauHoraireId }
        })
        return planningEspace
    }

    async findAllByBenevoleAndEspace(benevoleId: number, espaceId: number) {
        const planningsEspaces = await this.prisma.planningEspace.findMany({
            where: {
                benevoleId,
                espaceId
            },
            include: {
                espace: true,
                benevole: true,
                creneauHoraire: true
            }
        })
        for (const planningEspace of planningsEspaces) {
            planningEspace.benevole = new BenevoleEntity(await this.prisma.benevole.findUnique({
                where: { id: planningEspace.benevoleId }
            }))
            planningEspace.espace = await this.prisma.espace.findUnique({
                where: { id: planningEspace.espaceId }
            })
            planningEspace.creneauHoraire = await this.prisma.creneauHoraire.findUnique({
                where: { id: planningEspace.creneauHoraireId }
            })
        }
        return planningsEspaces
    }

    async remove(id: number) {
        const deletedPlanningEspace = await this.prisma.planningEspace.delete({
            where: { id }
        })
        const occurences = await this.prisma.planningEspace.count({
            where: {
                benevoleId: deletedPlanningEspace.benevoleId,
                creneauHoraireId: deletedPlanningEspace.creneauHoraireId,
                espaceId: deletedPlanningEspace.espaceId
            }
        })
        const flexible = occurences > 1 ? true : false
        // update all other planningsEspaces of the benevole for the same creneauHoraire and espace
        const planningsEspaces = await this.prisma.planningEspace.findMany({
            where: {
                benevoleId: deletedPlanningEspace.benevoleId,
                creneauHoraireId: deletedPlanningEspace.creneauHoraireId,
                espaceId: deletedPlanningEspace.espaceId
            }
        })
        for (const otherPlanningEspace of planningsEspaces) {
            await this.prisma.planningEspace.update({
                where: { id: otherPlanningEspace.id },
                data: {
                    flexible: flexible
                }
            })
        }
        return deletedPlanningEspace
    }
}
