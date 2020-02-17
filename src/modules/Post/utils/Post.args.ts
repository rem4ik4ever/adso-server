import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class PostArgs {
  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field()
  priceInfo: string;

  @Field({ nullable: true })
  price: number;

  @Field()
  address: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}
