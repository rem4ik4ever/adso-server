import Redis from "ioredis";

const getRedisClient = () => {
  return new Redis({
    host: "redis"
  });
};

export const redis = getRedisClient();
