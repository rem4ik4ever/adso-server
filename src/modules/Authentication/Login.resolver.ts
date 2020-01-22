import { Mutation, Resolver, Arg } from "type-graphql";
import { loginUser } from "../../services/authentication.service";
import { LoginInput } from "./inputs/Login.input";
import { logger } from "../../utils/logger";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { LoginResponse } from "./types/LoginResponse.type";

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("input")
    { email, password }: LoginInput
  ): Promise<LoginResponse | null> {
    let user = null;
    try {
      user = await loginUser(email, password);
    } catch (error) {
      logger(error);
      return null;
    }
    if (!user) return null;

    return {
      accessToken: await createAccessToken(user),
      refreshToken: await createRefreshToken(user)
    };
  }
}
