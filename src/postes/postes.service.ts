import { Injectable } from '@nestjs/common'
import { CreatePosteDto } from './dto/create-poste.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PostesService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createPosteDto: CreatePosteDto) {
        return this.prisma.poste.create({
            data: createPosteDto
        })
    }

    async findAll() {
        return this.prisma.poste.findMany()
    }

    async findOne(id: number) {
        return this.prisma.poste.findUnique({
            where: { id },
        })
    }

    async findAllByFestival(id: number) {
        return this.prisma.poste.findMany({
            where: { festivalYear: id }
        })
    }

    async remove(id: number) {
        return this.prisma.poste.delete({
            where: { id },
        })
    }
}
