import {
  Ctx,
  Resolver,
  Query,
  UseMiddleware,
  Args,
  ObjectType,
  Field,
  Int
} from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { PaginationArgs } from "../utils/args/Pagination.args";
import { postsService } from "../../services/posts.service";
import { AuthenticationError } from "apollo-server-express";
import { Post } from "../../entity/Post";

@ObjectType()
export class PaginatedPostResponse {
  @Field(() => [Post!])
  data: Post[];

  @Field(() => Int)
  total: number;

  @Field()
  hasMore: boolean;

  @Field()
  after?: string;
}

@Resolver()
export class MyAdsResolver {
  @Query(() => PaginatedPostResponse)
  @UseMiddleware(isAuth)
  async myAds(
    @Args() args: PaginationArgs,
    @Ctx() ctx: MyContext
  ): Promise<PaginatedPostResponse> {
    const user = await User.findOne(ctx.payload?.id);
    if (!user) throw new AuthenticationError("Unauthorized");

    const posts = await postsService.filter({
      ...args,
      userId: user.id
    });
    return {
      data: posts,
      total: 1,
      hasMore: true
    };
  }
}
