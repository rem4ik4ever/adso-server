import { createConnection } from "typeorm";

export const testConn = (drop: boolean = true) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "graphql-db-test",
    synchronize: drop,
    logging: drop,
    entities: [__dirname + "/../entity/*.*"]
  });
};
