import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) // whitelist: true will remove all the properties that are not defined in the DTO
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))) // This will remove the password from the response

  await app.listen(3000)
}
bootstrap()
