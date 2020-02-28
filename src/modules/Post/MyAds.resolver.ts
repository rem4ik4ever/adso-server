import {
  Ctx,
  Resolver,
  Query,
  UseMiddleware,
  Args,
  ObjectType,
  Field
} from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { PaginationArgs } from "../utils/args/Pagination.args";
import { postsService } from "../../services/posts.service";
import { AuthenticationError } from "apollo-server-express";
import PaginatedResponse from "../../utils/PaginatedResponse.class";
import { Post } from "../../entity/Post";

@ObjectType()
class PaginatedPostResponse extends PaginatedResponse(Post) {
  @Field(() => [Post])
  edges: Post[];

  @Field()
  totalCount: number;
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
    const posts = await postsService
      .filter({
        ...args,
        userId: user.id
      })
      .getMany();
    return {
      edges: posts,
      totalCount: await Post.count()
      // pageInfo: {}
    };
  }
}
