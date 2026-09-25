import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service.js'
import { profileContent, type ProfileContent } from './profile.content.js'
import type { Env } from '../config/env.js'

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async onApplicationBootstrap() {
    if (!this.config.get('SEED_ON_START')) {
      this.logger.log('SEED_ON_START=false — данные в базе не трогаю')
      return
    }

    await this.sync(profileContent)
    this.logger.log(`Визитка «${profileContent.slug}» залита в базу`)
  }

  async sync(content: ProfileContent) {
    const fields = {
      name: content.name,
      headline: content.headline,
      description: content.description,
      location: content.location,
      email: content.email,
    }

    await this.prisma.$transaction(async (tx) => {
      const profile = await tx.profile.upsert({
        where: { slug: content.slug },
        create: { slug: content.slug, ...fields },
        update: fields,
      })

      await tx.link.deleteMany({ where: { profileId: profile.id } })
      await tx.link.createMany({
        data: content.links.map((link, index) => ({
          ...link,
          sortOrder: index,
          profileId: profile.id,
        })),
      })

      await tx.skill.deleteMany({ where: { profileId: profile.id } })
      await tx.skill.createMany({
        data: content.skills.map((skill, index) => ({
          ...skill,
          sortOrder: index,
          profileId: profile.id,
        })),
      })

      await tx.experience.deleteMany({ where: { profileId: profile.id } })
      await tx.experience.createMany({
        data: content.experience.map((job) => ({
          ...job,
          startedAt: toMonthStart(job.startedAt),
          finishedAt: job.finishedAt ? toMonthStart(job.finishedAt) : null,
          profileId: profile.id,
        })),
      })

      await tx.project.deleteMany({ where: { profileId: profile.id } })
      await tx.project.createMany({
        data: content.projects.map((project, index) => ({
          ...project,
          demoUrl: project.demoUrl ?? null,
          sortOrder: index,
          profileId: profile.id,
        })),
      })
    })
  }
}

function toMonthStart(month: string) {
  return new Date(`${month}-01T00:00:00Z`)
}
