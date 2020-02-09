import { Seeder, Factory } from "typeorm-seeding";
import { Category } from "../../entity/Category";
import { Connection } from "typeorm";

export default class CategorySeeder implements Seeder {
  public async run(factory: Factory, _connection: Connection): Promise<any> {
    await factory(Category)().seedMany(10);
  }
}
