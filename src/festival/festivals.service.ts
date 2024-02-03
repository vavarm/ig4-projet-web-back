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
                postes: true
            }
        })
    }

    async findOne(id: number) {
        return await this.prisma.festival.findUnique({
            where: { year: id },
            include: {
                postes: true
            }
        })
    }

    async remove(id: number) {
        await this.prisma.inscriptionFestival.deleteMany({
            where: { festivalYear: id }
        })
        await this.prisma.poste.deleteMany({
            where: { festivalYear: id }
        })
        return await this.prisma.festival.delete({
            where: { year: id },
            include: {
                postes: true
            }
        })
    }
}
