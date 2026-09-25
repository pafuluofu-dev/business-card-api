import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import type { SkillCategory } from '../generated/prisma/enums.js'

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findOwner() {
    const profile = await this.prisma.profile.findFirst({ orderBy: { createdAt: 'asc' } })

    if (!profile) {
      throw new NotFoundException('В базе нет визитки — похоже, не прошло заполнение при старте')
    }

    return profile
  }

  async findBySlug(slug: string) {
    const profile = await this.prisma.profile.findUnique({ where: { slug } })

    if (!profile) {
      throw new NotFoundException(`Визитка «${slug}» не найдена`)
    }

    return profile
  }

  findLinks(profileId: string) {
    return this.prisma.link.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    })
  }

  findSkills(profileId: string, category?: SkillCategory) {
    return this.prisma.skill.findMany({
      where: { profileId, category },
      orderBy: { sortOrder: 'asc' },
    })
  }

  findExperience(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: { startedAt: 'desc' },
    })
  }

  findProjects(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    })
  }
}
