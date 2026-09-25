import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { SkillCategory } from '../generated/prisma/enums.js'
import { Experience } from './entities/experience.entity.js'
import { Link } from './entities/link.entity.js'
import { Profile } from './entities/profile.entity.js'
import { Project } from './entities/project.entity.js'
import { Skill } from './entities/skill.entity.js'
import { ProfileService } from './profile.service.js'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profiles: ProfileService) {}

  @Query(() => Profile, { description: 'Без аргумента вернёт визитку владельца сервиса' })
  profile(@Args('slug', { nullable: true }) slug?: string) {
    return slug ? this.profiles.findBySlug(slug) : this.profiles.findOwner()
  }

  @ResolveField(() => [Link])
  links(@Parent() profile: Profile) {
    return this.profiles.findLinks(profile.id)
  }

  @ResolveField(() => [Skill])
  skills(
    @Parent() profile: Profile,
    @Args('category', { type: () => SkillCategory, nullable: true }) category?: SkillCategory,
  ) {
    return this.profiles.findSkills(profile.id, category)
  }

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile) {
    return this.profiles.findExperience(profile.id)
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.profiles.findProjects(profile.id)
  }
}
