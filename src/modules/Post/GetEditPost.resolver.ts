import { Resolver, Arg, Ctx, Query, UseMiddleware } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../middleware/isAuth";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { AuthenticationError } from "apollo-server-express";

@Resolver()
export class GetEditPostResolver {
  @UseMiddleware(isAuth)
  @Query(() => Post)
  async getEditPost(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<Post | undefined> {
    const user = await User.findOne(ctx.payload?.id);
    if (!user) throw new AuthenticationError("Unauthorized");
    const post = Post.findOne({ where: { uuid: id, authorId: user.id } });
    return post;
  }
}
