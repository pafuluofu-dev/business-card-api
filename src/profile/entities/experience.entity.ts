import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: string

  @Field()
  company: string

  @Field(() => String, { nullable: true })
  companySite: string | null

  @Field()
  position: string

  @Field()
  description: string

  @Field(() => GraphQLISODateTime)
  startedAt: Date

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'null — работаю сейчас' })
  finishedAt: Date | null

  @Field(() => [String])
  achievements: string[]

  @Field(() => [String])
  stack: string[]
}
