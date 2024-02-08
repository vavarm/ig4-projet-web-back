import { Injectable } from '@nestjs/common'
import { CreateJeuDto } from './dto/create-jeu.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class JeuxService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createJeuDto: CreateJeuDto) {
        return await this.prisma.jeu.upsert({
            where: { idJeu: createJeuDto.idJeu },
            update: createJeuDto,
            create: createJeuDto
        })
    }

    async findAll() {
        return await this.prisma.jeu.findMany()
    }

    async findOne(id: number) {
        return await this.prisma.jeu.findUnique({
            where: { idJeu: id }
        })
    }

    async remove(id: number) {
        // remove EspacesJeux
        await this.prisma.espaceJeu.deleteMany({
            where: { jeuId: id }
        })
        // remove Jeu
        return await this.prisma.jeu.delete({
            where: { idJeu: id }
        })
    }
}
