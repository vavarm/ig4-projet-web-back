import { Injectable } from '@nestjs/common'
import { CreateFestivalDto } from './dto/create-festival.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class FestivalsService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createFestivalDto: CreateFestivalDto) {
        return await this.prisma.festival.create({
            data: createFestivalDto
        })
    }

    async findAll() {
        return await this.prisma.festival.findMany({
            include: {
                postes: true,
                jours: true
            }
        })
    }

    async findOne(id: number) {
        return await this.prisma.festival.findUnique({
            where: { year: id },
            include: {
                postes: true,
                jours: true
            }
        })
    }

    async remove(id: number) {
        const jours = await this.prisma.jour.findMany({
            where: { festivalYear: id }
        })
        for (const jour of jours) {
            const creneaux = await this.prisma.creneauHoraire.findMany({
                where: { jourId: jour.id }
            })
            for (const creneau of creneaux) {
                await this.prisma.planningEspace.deleteMany({
                    where: { creneauHoraireId: creneau.id }
                })
            }
            await this.prisma.creneauHoraire.deleteMany({
                where: { jourId: jour.id }
            })
        }
        await this.prisma.jour.deleteMany({
            where: { festivalYear: id }
        })
        await this.prisma.inscriptionFestival.deleteMany({
            where: { festivalYear: id }
        })
        await this.prisma.poste.deleteMany({
            where: { festivalYear: id }
        })
        return await this.prisma.festival.delete({
            where: { year: id },
            include: {
                postes: true,
                jours: true
            }
        })
    }
}
