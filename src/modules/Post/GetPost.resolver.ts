import { Arg, Query } from "type-graphql";
import { postsService } from "../../services/posts.service";
import { Post } from "../../entity/Post";

export class GetPostResolver {
  @Query(() => Post)
  async getPost(@Arg("id") id: string) {
    const post = await postsService.getOne(id);
    if (!post) throw new Error("NotFound");

    return post;
  }
}
