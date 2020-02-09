import { Resolver, Query } from "type-graphql";
import { Category } from "../../entity/Category";

@Resolver()
export class AllCategoriesResolver {
  @Query(() => [Category])
  async allCategories(): Promise<Array<Category>> {
    const categories = await Category.find();
    return categories;
  }
}
