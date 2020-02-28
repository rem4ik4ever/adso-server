import { ClassType, ObjectType, Field, Int } from "type-graphql";

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  ObjectType({ isAbstract: true });

  // class PageInfo {
  //   @Field()
  //   endCursor: string;

  //   @Field()
  //   beforeCursor: string;

  //   @Field()
  //   hasNextPage: boolean;
  // }
  @ObjectType()
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    edges: TItem[];

    @Field(() => Int)
    totalCount: number;

    // @Field()
    // pageInfo: PageInfo;
  }

  return PaginatedResponseClass;
}
