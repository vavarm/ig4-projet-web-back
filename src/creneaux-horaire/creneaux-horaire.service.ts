import { Injectable } from '@nestjs/common'
import { CreateCreneauHoraireDto } from './dto/create-creneau-horaire.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CreneauxHoraireService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createCreneauHoraireDto: CreateCreneauHoraireDto) {
        return await this.prisma.creneauHoraire.create({
            data: createCreneauHoraireDto
        })
    }

    async findAll() {
        return await this.prisma.creneauHoraire.findMany()
    }

    async findAllByFestival(year: number) {
        const jours = await this.prisma.jour.findMany({
            where: { festivalYear: year }
        })
        const creneauxHoraires = []
        for (const jour of jours) {
            const creneaux = await this.prisma.creneauHoraire.findMany({
                where: { jourId: jour.id }
            })
            creneauxHoraires.push(...creneaux)
        }
        return creneauxHoraires
    }

    async remove(id: number) {
        // TODO: get all planningEspaces by creneauId
        // TODO: remove all planningEspaces
        return await this.prisma.creneauHoraire.delete({
            where: { id: id }
        })
    }
}
