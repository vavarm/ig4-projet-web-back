import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from './../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(req: Request, res: Response, email: string, password: string) {
        // Find the benevole with this email
        const benevole = await this.prisma.benevole.findUnique({ where: { email: email } })

        // If the benevole doesn't exist, throw a 404 error
        if (!benevole) {
            throw new NotFoundException(`No benevole found for email: ${email}`)
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, benevole.password)

        // If the password is incorrect, throw a 401 error
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password')
        }

        // Generate the JWT token
        const payload = { id: benevole.id }
        const jwt = this.jwtService.sign(payload)

        // Set the cookie
        const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day
        res.cookie('accessToken', jwt, { httpOnly: true, secure: false, sameSite: 'lax', expires: expirationDate })

        return benevole
    }

    async logout(res: Response) {
        // Remove the cookie
        res.cookie('accessToken', '', { httpOnly: true, secure: false, sameSite: 'lax', expires: new Date(0) })
    }
}
