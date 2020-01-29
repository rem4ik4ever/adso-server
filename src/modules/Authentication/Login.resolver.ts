import { Mutation, Resolver, Arg } from "type-graphql";
import { loginUser } from "../../services/authentication.service";
import { LoginInput } from "./inputs/Login.input";
import { createAccessToken, createRefreshToken } from "../utils/auth";
import { LoginResponse } from "./types/LoginResponse.type";
import { AuthenticationError } from "apollo-server-express";

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
    if (!user.confirmed) throw new AuthenticationError("user_not_confirmed");

    return {
      accessToken: createAccessToken(user),
      refreshToken: createRefreshToken(user)
    };
  }
}
