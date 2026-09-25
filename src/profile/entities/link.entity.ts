import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Link {
  @Field(() => ID)
  id: string

  @Field()
  label: string

  @Field()
  url: string
}
