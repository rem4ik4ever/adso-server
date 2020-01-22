import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./config/redis-connect";
import cors from "cors";
import { createSchema } from "./utils/createSchema";
import { getPlugins } from "./config/apollo-plugins";
import "dotenv/config";
import cookieParser from "cookie-parser";

const startServer = async () => {
  await createConnection();
  const app = express();

  const schema = await createSchema();

  const plugins = getPlugins(schema);

  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    plugins,
    context: ({ req, res }: any) => ({ req, res })
  });

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "some-secret-from-env",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
