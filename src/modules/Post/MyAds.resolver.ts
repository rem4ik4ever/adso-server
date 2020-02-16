import { Ctx, Resolver, Query, UseMiddleware, Args } from "type-graphql";
import { Post } from "../../entity/Post";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";
import { PaginationArgs } from "../utils/args/Pagination.args";

@Resolver()
export class MyAdsResolver {
  @Query(() => [Post!])
  @UseMiddleware(isAuth)
  async myAds(
    @Args() args: PaginationArgs,
    @Ctx() ctx: MyContext
  ): Promise<Post[]> {
    const user = await User.findOne(ctx.payload?.id);
    console.log("Args", args);
    return user!.posts;
  }
}
