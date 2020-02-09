import { Category } from "../entity/Category";
import faker from "faker";

const CategoryData = (props: any): any => ({
  name: faker.random.word(),
  ...props
});

export const randomCategory = async (props?: any) => {
  const category = Category.create(CategoryData(props));
  await category.save();
  return category;
};
