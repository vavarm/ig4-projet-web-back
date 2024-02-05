import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Request, Response } from 'express'
import { BenevoleEntity } from 'src/benevoles/entities/benevole.entity'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() { email, password }: LoginDto) {
        const result = await this.authService.login(req, res, email, password)
        return { benevole: new BenevoleEntity(result.benevole), accessToken: result.accessToken }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        return await this.authService.logout(res)
    }
}