import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: process.env.FRONTEND_URL, credentials: true }) // This will allow us to send cookies from the client to the server

  app.use(cookieParser()) // This will allow us to use cookies in the application

  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) // whitelist: true will remove all the properties that are not defined in the DTO
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))) // This will remove the password from the response

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(3000)
}
bootstrap()
