import { createConnection } from "typeorm";
import * as path from "path"

export const testConn = (drop: boolean = true) => {
  return createConnection({
    name: "default",
    type: "sqlite",
    database: `${path.resolve(__dirname, "..")}/data/db.test.sqlite`,
    synchronize: drop,
    logging: drop,
    entities: [__dirname + "/../entity/*.*"]
  });
};
