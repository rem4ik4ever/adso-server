import Faker from "faker";
import { define } from "typeorm-seeding";
import { Category } from "../../entity/Category";

define(Category, (faker: typeof Faker, _settings: undefined) => {
  const name = faker.random.word();
  const category = new Category();
  category.name = name;

  return category;
});
