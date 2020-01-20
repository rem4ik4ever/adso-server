import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { verify } from "jsonwebtoken";

// bearer <token>

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    return new Error("Not Authenticated");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    context.payload = payload as any;
  } catch {
    throw new Error("Not authorized");
  }
  // if (!context.req.session!.userId) {
  //   throw new Error("Not authorized");
  // }

  return next();
};
