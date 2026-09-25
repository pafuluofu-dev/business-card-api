import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { SkillCategory } from '../../generated/prisma/enums.js'

registerEnumType(SkillCategory, {
  name: 'SkillCategory',
  description: 'Группа навыка: язык, фронтенд, бэкенд, данные, тесты, инструменты',
})

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => SkillCategory)
  category: SkillCategory
}
