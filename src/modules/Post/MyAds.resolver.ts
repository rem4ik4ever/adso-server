import { Ctx, Resolver, Query, UseMiddleware, Args } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { postsService } from "../../services/posts.service";
import { AuthenticationError } from "apollo-server-express";
import { PaginatedPostResponse } from "./utils/PaginatePostResponse.class";
import { PostFilterArgs } from "./utils/PostFilters.args";

@Resolver()
export class MyAdsResolver {
  @Query(() => PaginatedPostResponse)
  @UseMiddleware(isAuth)
  async myAds(
    @Args() args: PostFilterArgs,
    @Ctx() ctx: MyContext
  ): Promise<PaginatedPostResponse> {
    const user = await User.findOne(ctx.payload?.id);
    if (!user) throw new AuthenticationError("Unauthorized");
    const posts = await postsService.filter(args, user.id);
    return await postsService.paginate(args, posts);
  }
}
