import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";
// Add isEmailAlreadyExist validator

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(0, 255)
  firstName: string;

  @Field()
  @Length(0, 255)
  lastName: string;

  @Field()
  password: string;
}
