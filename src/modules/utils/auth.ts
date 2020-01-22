import { sign, verify } from "jsonwebtoken";
import { User } from "../../entity/User";

const access_secret =
  process.env.NODE_ENV !== "test" ? process.env.ACCESS_TOKEN_SECRET! : "secret";

const refresh_secret =
  process.env.NODE_ENV !== "test"
    ? process.env.ACCESS_TOKEN_REFRESH_SECRET!
    : "refresh-secret";

export const createAccessToken = (user: User): string => {
  return sign(
    {
      id: user.id
    },
    access_secret,
    {
      expiresIn: "2d"
    }
  );
};

export const createRefreshToken = (user: User): string => {
  return sign({ id: user.id }, refresh_secret, {
    expiresIn: "7d"
  });
};

export const verifyAccessToken = (token: string): Object | string =>
  verify(token, process.env.ACCESS_TOKEN_SECRET!);

export const verifyRefreshToken = (token: string): Object | string =>
  verify(token, refresh_secret);

export const getHeaderJWT = (header: string): string | null => {
  try {
    const token = header.split(" ")[1];
    return token;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
