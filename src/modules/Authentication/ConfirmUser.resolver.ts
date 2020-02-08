import { Resolver, Mutation, Arg } from "type-graphql";
import { confirmUser } from "../../services/authentication.service";
import { AuthenticationError } from "apollo-server-express";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirm(@Arg("token") token: string): Promise<boolean> {
    const { data, error } = await confirmUser(token);
    if (!data) throw new AuthenticationError(error as string);

    return data as boolean;
  }
}
