import { Resolver, Query, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { refresh } from "../../services/authentication.service";

@Resolver()
export class RefreshResolver {
  @Query(() => String, { nullable: true })
  async refresh(@Ctx() ctx: MyContext): Promise<string | null> {
    if (!ctx.req.cookies) return null;

    const refreshToken = ctx.req.cookies.adso_qid;
    if (!refreshToken) return null;

    return await refresh(refreshToken);
  }
}
