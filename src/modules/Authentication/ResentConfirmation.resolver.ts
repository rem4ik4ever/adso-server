import { Mutation, Resolver, Arg } from "type-graphql";
import { resendConfirmation } from "../../services/authentication.service";

@Resolver()
export class ResendConfirmationResolver {
  @Mutation(() => Boolean)
  async resendConfirmation(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("token") token: string
  ): Promise<Boolean> {
    return await resendConfirmation(email, password, token);
  }
}
