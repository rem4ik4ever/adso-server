import { PostFilterInterface } from "../../../interfaces/post.interfaces";
import { Field, Int, ArgsType } from "type-graphql";

@ArgsType()
export class PostFilterArgs implements PostFilterInterface {
  @Field({ nullable: true })
  latitude: number;

  @Field({ nullable: true })
  longitude: number;

  @Field({ nullable: true })
  distance: number;

  @Field({ nullable: true })
  from: number;

  @Field({ nullable: true })
  to: number;

  @Field({ nullable: true })
  searchTerm?: string;

  @Field({ nullable: true })
  categoryId?: number;

  @Field({ nullable: true })
  userId?: number;

  @Field(() => Int, { defaultValue: 20 })
  first?: number;

  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  before?: string;
}
