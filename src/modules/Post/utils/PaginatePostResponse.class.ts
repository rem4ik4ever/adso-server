import { PaginatedResponse } from "../../../utils/PaginatedResponse.class";
import { ObjectType, Field } from "type-graphql";
import { Post } from "../../../entity/Post";
import { PageInfo } from "../../../utils/PageInfo.class";

@ObjectType()
export class PaginatedPostResponse extends PaginatedResponse(Post) {
  @Field(() => [Post])
  edges: Post[];

  @Field()
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
