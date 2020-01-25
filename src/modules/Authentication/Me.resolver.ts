import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { logger } from "../../utils/logger";
import { verifyAccessToken, getHeaderJWT } from "../utils/auth";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.headers.authorization) {
      return undefined;
    }
    const auth = ctx.req.headers.authorization;
    let token = getHeaderJWT(auth);
    if (!token) return undefined;

    try {
      const payload = verifyAccessToken(token);
      return await User.findOne(payload.id);
    } catch (err) {
      logger(err);
      return undefined;
    }
  }
}
