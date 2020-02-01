import { User } from "../entity/User";
import { Post, PostInterface, PostFilters } from "../entity/Post";

/**
 * Create post
 *
 * @param data PostInterface
 * @param user User
 */
export const createPost = async (
  data: PostInterface,
  user: User
): Promise<Post> => {
  const postData = {
    ...data,
    author: user
  } as any;
  const post = await Post.create(postData).save();
  return post;
};

export const allPosts = async ({
  perPage = 40,
  page = 1
}: PostFilters): Promise<Post[]> => {
  const posts = await Post.createQueryBuilder()
    .skip(perPage * (page - 1))
    .take(perPage)
    .getMany();

  return posts;
};
