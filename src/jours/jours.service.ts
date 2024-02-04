import { Injectable } from '@nestjs/common'
import { CreateJourDto } from "./dto/create-jour.dto"
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class JoursService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createJourDto: CreateJourDto) {
        return await this.prisma.jour.create({
            data: createJourDto
        })
    }

    async findAll() {
        return await this.prisma.jour.findMany({
            include: { creneauxHoraire: true }
        })
    }

    async findAllByFestival(year: number) {
        return await this.prisma.jour.findMany({
            where: { festivalYear: year },
            include: { creneauxHoraire: true }
        })
    }

    async remove(id: number) {
        const creneaux = await this.prisma.creneauHoraire.findMany({
            where: { jourId: id }
        })
        for (const creneau of creneaux) {
            await this.prisma.planningEspace.deleteMany({
                where: { creneauHoraireId: creneau.id }
            })
        }
        await this.prisma.creneauHoraire.deleteMany({
            where: { jourId: id }
        })
        return await this.prisma.jour.delete({
            where: { id: id }
        })
    }
}
