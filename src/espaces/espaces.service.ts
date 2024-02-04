import { Injectable } from '@nestjs/common'
import { CreateEspaceDto } from './dto/create-espace.dto'
import { UpdateEspaceDto } from './dto/update-espace.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EspacesService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createEspaceDto: CreateEspaceDto) {
        return await this.prisma.espace.create({
            data: createEspaceDto
        })
    }

    async findAll() {
        const espaces = await this.prisma.espace.findMany({
            include: {
                planningsEspaces: true
            }
        })
        const espacesWithNbPlaces = []
        for (const espace of espaces) {
            const nbPlaces = await this.prisma.planningEspace.count({
                where: { espaceId: espace.id }
            })
            espacesWithNbPlaces.push({
                ...espace,
                nbPlaces: nbPlaces
            })
        }
        return espacesWithNbPlaces
    }

    async findAllByFestival(year: number) {
        const postes = await this.prisma.poste.findMany({
            where: { festivalYear: year }
        })
        const espaces = []
        for (const poste of postes) {
            const espacesPoste = await this.prisma.espace.findMany({
                where: { posteId: poste.id }
            })
            espaces.push(...espacesPoste)
            espaces.forEach(async (espace) => {
                const nbPlaces = await this.prisma.planningEspace.count({
                    where: { espaceId: espace.id }
                })
                espace.nbPlaces = nbPlaces
            })
        }
        return espaces
    }

    async update(id: number, updateEspaceDto: UpdateEspaceDto) {
        return await this.prisma.espace.update({
            where: { id: id },
            data: updateEspaceDto
        })
    }

    async remove(id: number) {
        // remove planningEspaces
        await this.prisma.planningEspace.deleteMany({
            where: { espaceId: id }
        })
        // remove espace
        return await this.prisma.espace.delete({
            where: { id: id }
        })
    }
}
