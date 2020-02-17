import { Resolver, Mutation, Args, Ctx } from "type-graphql";
import { Post } from "../../entity/Post";
import { PostArgs } from "./utils/Post.args";
import { MyContext } from "../../types/MyContext";
import { User } from "../../entity/User";
import { AuthenticationError } from "apollo-server-express";
import { postsService } from "../../services/posts.service";

@Resolver()
export class UpdatePostResolver {
  @Mutation(() => Post)
  async updatePost(
    @Args() args: PostArgs,
    @Ctx() ctx: MyContext
  ): Promise<Post | undefined> {
    const user = await User.findOne(ctx.payload?.id);
    if (!user) throw new AuthenticationError("Unauthorized");

    const post = Post.findOne({
      where: { uuid: args.uuid, authorId: user.id }
    });
    if (!post) throw new AuthenticationError("Unauthorized");

    const updated = await postsService.update(args.uuid, args);
    if (!updated) throw new Error("NotFound");
    return updated;
  }
}
