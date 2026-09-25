import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Experience } from './entities/experience.entity.js'
import { formatPeriod } from './period.js'

@Resolver(() => Experience)
export class ExperienceResolver {
  @ResolveField(() => String, {
    description: 'Период работы словами: «сентябрь 2024 — сентябрь 2026»',
  })
  period(@Parent() experience: Experience) {
    return formatPeriod(experience.startedAt, experience.finishedAt)
  }
}
