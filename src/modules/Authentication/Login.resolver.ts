import { Mutation, Resolver, Arg } from "type-graphql";
import { loginUser } from "../../services/authentication.service";
import { LoginInput } from "./inputs/Login.input";
import { User } from "../../entity/User";
import { logger } from "../../utils/logger";

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg("input")
    { email, password }: LoginInput
  ): Promise<User | null> {
    let user = null;
    try {
      user = await loginUser(email, password);
    } catch (error) {
      logger(error);
      return user;
    }
    return user;
  }
}
