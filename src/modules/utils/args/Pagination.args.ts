import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 20 })
  first?: number;

  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  before?: string;
}
