import { Mutation, Resolver, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./inputs/Register.input";
import { registerUser } from "../../services/authentication.service";

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("input")
    { email, firstName, lastName, password }: RegisterInput
  ): Promise<User | null> {
    try {
      const userData = {
        email,
        firstName,
        lastName,
        password,
        confirmed: false,
        isActive: true
      };
      const user = await registerUser(userData);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
