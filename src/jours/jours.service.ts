// TODO: include creneaux horaire in the responseimport { Injectable } from '@nestjs/common'
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
        // TODO: include creneaux horaire in the response
        return await this.prisma.jour.findMany()
    }

    async findAllByFestival(year: number) {
        // TODO: include creneaux horaire in the response
        return await this.prisma.jour.findMany({
            where: { festivalYear: year }
        })
    }

    async remove(id: number) {
        // TODO: get all creneaux horaire by jourId
        // TODO: get all planningEspaces by creneauId
        // TODO: remove all planningEspaces
        // TODO: remove all creneaux horaire
        return await this.prisma.jour.delete({
            where: { id: id }
        })
    }
}
