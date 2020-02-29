import { ObjectType, Field } from "type-graphql";
@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  beforeCursor: string;

  @Field({ defaultValue: false })
  hasNextPage: boolean;
}
