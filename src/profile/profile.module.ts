import { Module } from '@nestjs/common'
import { ExperienceResolver } from './experience.resolver.js'
import { ProfileResolver } from './profile.resolver.js'
import { ProfileService } from './profile.service.js'

@Module({
  providers: [ProfileService, ProfileResolver, ExperienceResolver],
})
export class ProfileModule {}
