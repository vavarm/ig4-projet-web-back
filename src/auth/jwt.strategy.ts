import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtSecret } from './auth.module'
import { Request } from 'express'
import { BenevolesService } from 'src/benevoles/benevoles.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private benevolesService: BenevolesService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                //JwtStrategy.extractJWTFromCookies,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: jwtSecret,
        })
    }

    async validate(payload: { id: number }) {
        const benevole = await this.benevolesService.findOne(payload.id)

        if (!benevole) {
            throw new UnauthorizedException()
        }

        return benevole
    }

    private static extractJWTFromCookies(req: Request): string | null {
        if (
            req.cookies &&
            'accessToken' in req.cookies &&
            req.cookies.accessToken.length > 0
        ) {
            return req.cookies.accessToken
        }
        return null
    }
}