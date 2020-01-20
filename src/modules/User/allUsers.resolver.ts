import { Resolver, Query } from "type-graphql";
import { User } from "../../entity/User";


@Resolver()
export class AllUsersResolver {
  @Query(() => [User])
  async allUsers(): Promise<User[] | undefined> {
    return User.find();
  }
}
