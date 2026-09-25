import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import type { Env } from './config/env.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableShutdownHooks()

  const port = app.get<ConfigService<Env, true>>(ConfigService).get('PORT')
  await app.listen(port, '0.0.0.0')

  new Logger('Bootstrap').log(`Apollo Sandbox на http://localhost:${port}/graphql`)
}

await bootstrap()
