import { Mutation, Resolver, Arg } from "type-graphql";
import { loginUser } from "../../services/authentication.service";
import { LoginInput } from "./inputs/Login.input";
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
    user = await loginUser(email, password);
    if (!user) return null;

    return {
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user)
    };
  }
}
