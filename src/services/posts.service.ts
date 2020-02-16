import { User } from "../entity/User";
import { Post, PostInterface, PostFilters } from "../entity/Post";
import { PostFilterInterface } from "./post.interfaces";

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

/**
 * Get All Posts with pagination
 *
 * @param postFilters PostFilters
 */
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

/**
 * Get post by given uuid
 *
 * @param uuid String
 */
export const getPost = async (uuid: string): Promise<Post | null> => {
  const post = await Post.findOne({ where: { uuid } });
  if (!post) return null;

  return post;
};

/**
 * Update Post by given uuid
 *
 * @param uuid String
 * @param updateData PostInterface
 */
export const updatePost = async (uuid: string, updateData: PostInterface) => {
  const queryBuilder = Post.createQueryBuilder();

  await queryBuilder
    .update(updateData as any)
    .where(`uuid = :uuid`, { uuid })
    .execute();
  return await getPost(uuid);
};

/**
 * Delete post by given uuid
 *
 * @param uuid string
 */
export const deletePost = async (uuid: string) => {
  const queryBuilder = Post.createQueryBuilder();

  const result = await queryBuilder
    .delete()
    .where("uuid = :uuid", { uuid })
    .execute();
  return result;
};

export const filterPosts = async ({
  searchTerm,
  location,
  priceRange,
  categoryId,
  userId
}: PostFilterInterface): Promise<Post[]> => {
  console.log(searchTerm, location, priceRange, categoryId);
  const queryBuilder = Post.createQueryBuilder();
  const term = searchTerm?.toLocaleLowerCase();
  queryBuilder.where(`authorId = :userId`, { userId });
  queryBuilder.where(
    `(lower(title) LIKE :searchTerm OR lower(description) LIKE :searchTerm)`,
    { searchTerm: `%${term}%` }
  );

  const results = await queryBuilder.getMany();

  return results;
};

/**
 * Service object
 */
export const postsService = {
  create: createPost,
  update: updatePost,
  get: allPosts,
  getOne: getPost,
  delete: deletePost
};
