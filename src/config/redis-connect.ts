import Redis from "ioredis";
/* tslint:disable:no-var-requires */
const MemoryCache = require("@outofsync/memory-cache");

const getRedisClient = () => {
  if (process.env.NODE_ENV === "test") {
    const client = new MemoryCache({ bypassUnsupported: true });
    return client.createClient();
  }
  return new Redis({
    host: "redis"
  });
};

export const redis = getRedisClient();
