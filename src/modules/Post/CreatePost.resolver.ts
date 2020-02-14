import {
  Resolver,
  Mutation,
  Ctx,
  ArgsType,
  Field,
  Args,
  Float,
  Int,
  UseMiddleware
} from "type-graphql";
import { Post, PostInterface } from "../../entity/Post";
import { createPost } from "../../services/posts.service";
import { MyContext } from "../../types/MyContext";
import { AuthenticationError } from "apollo-server-express";
import { User } from "../../entity/User";
import { isAuth } from "../middleware/isAuth";

@ArgsType()
class PostArgs {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String])
  images: string[];

  @Field(() => [String])
  tags: string[];

  @Field()
  priceInfo: string;

  @Field(() => Float, { nullable: true })
  price: number;

  @Field()
  address: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Int)
  categoryId: number;
}

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Args()
    {
      title,
      description,
      images,
      tags,
      priceInfo,
      price,
      address,
      latitude,
      longitude,
      categoryId
    }: PostArgs,
    @Ctx() ctx: MyContext
  ): Promise<Post> {
    const data: PostInterface = {
      title,
      description,
      images,
      tags,
      priceInfo,
      price,
      address,
      latitude,
      longitude,
      categoryId
    };
    console.log("ctx.payload.userId", ctx.payload);
    if (!ctx.payload?.id) throw new AuthenticationError("Unauthorized");

    const user = await User.findOne(ctx.payload.id);
    if (!user) throw new AuthenticationError("Unauthorized");

    const post = await createPost(data, user);

    return post;
  }
}
