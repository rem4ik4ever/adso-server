import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
