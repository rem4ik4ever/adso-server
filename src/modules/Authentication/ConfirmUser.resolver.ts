import { Resolver, Mutation, Arg } from "type-graphql";
import { confirmUser } from "../../services/authentication.service";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirm(@Arg("token") token: string): Promise<boolean> {
    return await confirmUser(token);
  }
}
