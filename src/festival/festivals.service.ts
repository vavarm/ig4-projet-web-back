import { Injectable } from '@nestjs/common'
import { CreateFestivalDto } from './dto/create-festival.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class FestivalsService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createFestivalDto: CreateFestivalDto) {
        return this.prisma.festival.create({
            data: createFestivalDto
        })
    }

    async findAll() {
        return this.prisma.festival.findMany()
    }

    async findOne(id: number) {
        return this.prisma.festival.findUnique({
            where: { year: id },
        })
    }

    async remove(id: number) {
        return this.prisma.festival.delete({
            where: { year: id },
        })
    }
}
