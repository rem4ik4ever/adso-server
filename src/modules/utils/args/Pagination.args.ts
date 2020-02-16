import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class PaginationArgs {
  @Field()
  searchTerm?: string;

  @Field()
  perPage?: number;

  @Field()
  after?: string;
}
