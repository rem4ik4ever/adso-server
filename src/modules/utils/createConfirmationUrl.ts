import { v4 } from "uuid";
import { redis } from "../../config/redis-connect";
import { confirmEmailPrefix } from "../constants/redisPrefixes";

export const createConfirmationToken = async (
  userId: number
): Promise<string> => {
  const token = v4();
  const key = `${confirmEmailPrefix}${token}`;
  await redis.set(key, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return token;
};
