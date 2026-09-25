import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service.js'
import { ProfileService } from './profile.service.js'

const prisma = {
  profile: { findFirst: vi.fn(), findUnique: vi.fn() },
  skill: { findMany: vi.fn() },
}

describe('ProfileService', () => {
  let service: ProfileService

  beforeEach(async () => {
    vi.resetAllMocks()

    const moduleRef = await Test.createTestingModule({
      providers: [ProfileService, { provide: PrismaService, useValue: prisma }],
    }).compile()

    service = moduleRef.get(ProfileService)
  })

  it('отдаёт визитку владельца — самую раннюю в базе', async () => {
    prisma.profile.findFirst.mockResolvedValue({ id: 'p1', slug: 'owner' })

    await expect(service.findOwner()).resolves.toMatchObject({ slug: 'owner' })
    expect(prisma.profile.findFirst).toHaveBeenCalledWith({ orderBy: { createdAt: 'asc' } })
  })

  it('на пустой базе бросает 404, а не отдаёт null', async () => {
    prisma.profile.findFirst.mockResolvedValue(null)

    await expect(service.findOwner()).rejects.toBeInstanceOf(NotFoundException)
  })

  it('на неизвестный slug бросает 404', async () => {
    prisma.profile.findUnique.mockResolvedValue(null)

    await expect(service.findBySlug('кто-то-другой')).rejects.toBeInstanceOf(NotFoundException)
  })

  it('фильтрует навыки по группе', async () => {
    prisma.skill.findMany.mockResolvedValue([])

    await service.findSkills('p1', 'BACKEND')

    expect(prisma.skill.findMany).toHaveBeenCalledWith({
      where: { profileId: 'p1', category: 'BACKEND' },
      orderBy: { sortOrder: 'asc' },
    })
  })
})
