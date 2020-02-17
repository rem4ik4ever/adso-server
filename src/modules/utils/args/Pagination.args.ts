import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PaginationArgs {
  @Field({ nullable: true })
  searchTerm?: string;

  @Field(() => Int, { defaultValue: 20 })
  perPage?: number;

  @Field({ nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  categoryId?: number;
}
