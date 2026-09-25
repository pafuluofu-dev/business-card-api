import { join } from 'node:path'
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { AppController } from './app.controller.js'
import { validateEnv } from './config/env.js'
import { HealthModule } from './health/health.module.js'
import { PrismaModule } from './prisma/prisma.module.js'
import { ProfileModule } from './profile/profile.module.js'
import { SeedModule } from './seed/seed.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnv }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      introspection: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true, footer: false })],
    }),
    PrismaModule,
    ProfileModule,
    SeedModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
