import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Experience } from './experience.entity.js'
import { Link } from './link.entity.js'
import { Project } from './project.entity.js'
import { Skill } from './skill.entity.js'

@ObjectType({ description: 'Визитка разработчика' })
export class Profile {
  @Field(() => ID)
  id: string

  @Field()
  slug: string

  @Field()
  name: string

  @Field({ description: 'Должность одной строкой' })
  headline: string

  @Field()
  description: string

  @Field()
  location: string

  @Field()
  email: string

  @Field(() => [Link])
  links: Link[]

  @Field(() => [Skill])
  skills: Skill[]

  @Field(() => [Experience])
  experience: Experience[]

  @Field(() => [Project])
  projects: Project[]
}
