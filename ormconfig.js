module.exports = {
  name: "default",
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "graphql-db",
  synchronize: true,
  logging: true,
  entities: ["src/entity/*.*"],
  seeds: ["src/db/seeds/**/*.seed.ts"],
  factories: ["src/db/factories/**/*.factory.ts"]
};
