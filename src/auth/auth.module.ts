import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from 'src/prisma/prisma.module'
import { BenevolesModule } from 'src/benevoles/benevoles.module'
import { JwtStrategy } from './jwt.strategy'

export const jwtSecret = process.env.JWT_SECRET

const roundsOfHashingPassword = process.env.ROUNDS_OF_HASHING

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: jwtSecret,
            signOptions: { expiresIn: '30m' },
        }),
        forwardRef(() => BenevolesModule),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }