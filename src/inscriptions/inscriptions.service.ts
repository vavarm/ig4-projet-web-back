import { Injectable } from '@nestjs/common'
import { CreateInscriptionDto } from './dto/create-inscription.dto'
import { UpdateInscriptionDto } from './dto/update-inscription.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class InscriptionsService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createInscriptionDto: CreateInscriptionDto) {
        return this.prisma.inscriptionFestival.create({
            data: createInscriptionDto
        })
    }

    async findAll() {
        return this.prisma.inscriptionFestival.findMany()
    }

    async findAllByFestival(id: number) {
        return this.prisma.inscriptionFestival.findMany({
            where: { festivalYear: id }
        })
    }

    async findAllByBenevole(id: number) {
        return this.prisma.inscriptionFestival.findMany({
            where: { benevoleId: id }
        })
    }

    async update(benevoleId: number, festivalYear: number, updateInscriptionDto: UpdateInscriptionDto) {
        return this.prisma.inscriptionFestival.update({
            where: { benevoleId_festivalYear: { benevoleId, festivalYear } },
            data: updateInscriptionDto
        })
    }

    async remove(benevoleId: number, festivalYear: number) {
        return this.prisma.inscriptionFestival.delete({
            where: { benevoleId_festivalYear: { benevoleId, festivalYear } }
        })
    }
}