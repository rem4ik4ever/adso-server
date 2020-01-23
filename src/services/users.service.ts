import { redis } from "../config/redis-connect";
import { confirmEmailPrefix } from "../modules/constants/redisPrefixes";

export const findUserByConfirmationToken = async (
  token: string
): Promise<string | null> => {
  const userId = await redis.get(`${confirmEmailPrefix}${token}`);
  if (!userId) return null;

  await redis.del(`${confirmEmailPrefix}${token}`);
  return userId;
};
