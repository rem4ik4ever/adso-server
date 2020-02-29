import { ClassType, ObjectType, Field, Int } from "type-graphql";
import { PageInfo } from "./PageInfo.class";

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  ObjectType({ isAbstract: true });
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    edges: TItem[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return PaginatedResponseClass;
}
