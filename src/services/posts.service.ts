import { User } from "../entity/User";
import { Post, PostInterface, PostFilters } from "../entity/Post";
import { PostFilterInterface } from "../interfaces/post.interfaces";
import { Category } from "../entity/Category";
import { SelectQueryBuilder } from "typeorm";

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
  const category = await Category.findOne(data.categoryId);
  const postData = {
    ...data,
    category,
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
  first = 40
}: PostFilters): Promise<Post[]> => {
  const posts = await Post.createQueryBuilder()
    .take(first)
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

export const filterPosts = ({
  searchTerm,
  location,
  priceRange,
  categoryId,
  userId
}: PostFilterInterface): SelectQueryBuilder<Post> => {
  console.log(searchTerm, location, priceRange, categoryId);

  const queryBuilder = Post.createQueryBuilder("post");
  const term = searchTerm?.toLocaleLowerCase();
  // queryBuilder.where("post.authorId = 1");
  // queryBuilder.where("title = :title", { title: "qweqweqweq" });
  queryBuilder.leftJoin("post.author", "user");
  queryBuilder.where("user.id = :userId", { userId });
  if (term) {
    queryBuilder.andWhere(
      `(lower(title) LIKE :searchTerm OR lower(description) LIKE :searchTerm)`,
      { searchTerm: `%${term}%` }
    );
  }
  return queryBuilder;
};

/**
 * Service object
 */
export const postsService = {
  create: createPost,
  update: updatePost,
  get: allPosts,
  getOne: getPost,
  delete: deletePost,
  filter: filterPosts
};
