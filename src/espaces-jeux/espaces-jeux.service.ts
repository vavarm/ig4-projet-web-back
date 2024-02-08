import { Injectable } from '@nestjs/common'
import { CreateEspaceJeuDto } from './dto/create-espace-jeu.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EspacesJeuxService {

    constructor(private readonly prisma: PrismaService) { }

    async create(createEspaceJeuDto: CreateEspaceJeuDto) {
        return await this.prisma.espaceJeu.create({
            data: createEspaceJeuDto,
            include: {
                jeu: true,
                espace: true
            }
        })
    }

    async findAll() {
        return await this.prisma.espaceJeu.findMany({
            include: {
                jeu: true,
                espace: true
            }
        })
    }

    async findOne(id: number) {
        return await this.prisma.espaceJeu.findUnique({
            where: { id: id },
            include: {
                jeu: true,
                espace: true
            }
        })
    }

    async remove(id: number) {
        return await this.prisma.espaceJeu.delete({
            where: { id: id },
            include: {
                jeu: true,
                espace: true
            }
        })
    }
}
