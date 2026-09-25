import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../src/app.module.js'
import { PrismaService } from '../src/prisma/prisma.service.js'

const profile = {
  id: 'p1',
  slug: 'owner',
  name: 'Георгий Павлов-Косов',
  headline: 'Frontend-разработчик',
  description: 'Пишу интерфейсы и бэкенды на TypeScript.',
  location: 'Москва',
  email: 'pafuluofu@atomicmail.io',
}

const prisma = {
  $queryRaw: async () => [{ result: 1 }],
  profile: {
    findFirst: async () => profile,
    findUnique: async () => profile,
  },
  link: {
    findMany: async () => [{ id: 'l1', label: 'GitHub', url: 'https://github.com/pafuluofu-dev' }],
  },
  skill: {
    findMany: async () => [{ id: 's1', name: 'NestJS', category: 'BACKEND' }],
  },
  experience: {
    findMany: async () => [
      {
        id: 'e1',
        company: 'MailLift',
        companySite: 'https://maillift.com',
        position: 'Frontend-разработчик',
        description: 'Фронтенд SaaS-платформы для рассылок.',
        startedAt: new Date('2023-09-01T00:00:00Z'),
        finishedAt: new Date('2024-09-01T00:00:00Z'),
        achievements: ['Многошаговое создание рассылки'],
        stack: ['React'],
      },
    ],
  },
  project: {
    findMany: async () => [
      {
        id: 'pr1',
        name: 'Inverty',
        description: 'Telegram Mini App для картинок.',
        demoUrl: 'https://pafuluofu-dev.github.io/inverty-app/',
        repoUrl: 'https://github.com/pafuluofu-dev/inverty-app',
        stack: ['TypeScript'],
      },
    ],
  },
}

describe('Визитка (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('отдаёт профиль вместе с вложенными данными', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          {
            profile {
              name
              headline
              links { label url }
              skills(category: BACKEND) { name category }
              experience { company period achievements }
              projects { name repoUrl }
            }
          }
        `,
      })
      .expect(200)

    expect(response.body.errors).toBeUndefined()
    expect(response.body.data.profile).toMatchObject({
      name: 'Георгий Павлов-Косов',
      links: [{ label: 'GitHub', url: 'https://github.com/pafuluofu-dev' }],
      skills: [{ name: 'NestJS', category: 'BACKEND' }],
      experience: [{ company: 'MailLift', period: 'сентябрь 2023 — сентябрь 2024' }],
      projects: [{ name: 'Inverty' }],
    })
  })

  it('с корня ведёт в Apollo Sandbox', async () => {
    await request(app.getHttpServer()).get('/').expect(302).expect('Location', '/graphql')
  })

  it('/health отвечает ok', async () => {
    await request(app.getHttpServer()).get('/health').expect(200, { status: 'ok' })
  })
})
