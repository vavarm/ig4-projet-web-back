import { Injectable } from '@nestjs/common'
import { CreatePosteDto } from './dto/create-poste.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostesService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createPosteDto: CreatePosteDto) {
        const createDefaultEspace = createPosteDto.createDefaultEspace
        delete createPosteDto.createDefaultEspace
        const nbPlacesForDefaultEspace = createPosteDto.nbPlacesForDefaultEspace
        delete createPosteDto.nbPlacesForDefaultEspace
        const poste = await this.prisma.poste.create({
            data: createPosteDto
        })
        if (createDefaultEspace) {
            await this.prisma.espace.create({
                data: {
                    nom: createPosteDto.nom,
                    nbPlacesMax: nbPlacesForDefaultEspace,
                    posteId: poste.id
                }
            })
        }
        return poste
    }

    async findAll() {
        // postes with espaces and sum of nbPlaces of their espaces
        const postesWithEspaces = await this.prisma.poste.findMany({
            include: {
                espaces: true
            }
        })

        const postes = []
        for (const poste of postesWithEspaces) {
            let nbPlaces = 0
            let nbPlacesMax = 0
            for (const espace of poste.espaces) {
                nbPlacesMax += espace.nbPlacesMax
                nbPlaces += await this.prisma.planningEspace.count({
                    where: {
                        espaceId: espace.id
                    }
                })
            }
            postes.push({
                ...poste,
                nbPlaces: nbPlaces,
                nbPlacesMax: nbPlacesMax
            })
        }

        return postes
    }

    async findOne(id: number) {
        const postesWithEspaces = await this.prisma.poste.findUnique({
            where: { id },
            include: {
                espaces: true
            }
        })

        let nbPlaces = 0
        let nbPlacesMax = 0
        for (const espace of postesWithEspaces.espaces) {
            nbPlacesMax += espace.nbPlacesMax
            nbPlaces += await this.prisma.planningEspace.count({
                where: {
                    espaceId: espace.id
                }
            })
        }
        return {
            ...postesWithEspaces,
            nbPlaces: nbPlaces,
            nbPlacesMax: nbPlacesMax
        }
    }

    async findAllByFestival(id: number) {
        const postesWithEspaces = await this.prisma.poste.findMany({
            where: { festivalYear: id },
            include: {
                espaces: true
            }
        })

        const postes = []

        for (const poste of postesWithEspaces) {
            let nbPlaces = 0
            let nbPlacesMax = 0
            for (const espace of poste.espaces) {
                nbPlacesMax += espace.nbPlacesMax
                nbPlaces += await this.prisma.planningEspace.count({
                    where: {
                        espaceId: espace.id
                    }
                })
            }
            postes.push({
                ...poste,
                nbPlaces: nbPlaces,
                nbPlacesMax: nbPlacesMax
            })
        }

        return postes
    }

    async remove(id: number) {
        const espaces = await this.prisma.espace.findMany({
            where: { posteId: id }
        })
        for (const espace of espaces) {
            // remove planningEspaces
            await this.prisma.planningEspace.deleteMany({
                where: { espaceId: espace.id }
            })
        }
        await this.prisma.espace.deleteMany({
            where: { posteId: id }
        })
        return this.prisma.poste.delete({
            where: { id },
        })
    }
}
