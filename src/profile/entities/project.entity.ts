import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field(() => String, { nullable: true })
  demoUrl: string | null

  @Field()
  repoUrl: string

  @Field(() => [String])
  stack: string[]
}
