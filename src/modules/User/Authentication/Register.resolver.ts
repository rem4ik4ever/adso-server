import { Mutation, Resolver, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { RegisterInput } from "../inputs/Register.input";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";
import { User } from "../../../entity/User";
import { sendEmail } from "../../utils/sendEmail";

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg("input")
    { email, firstName, lastName, password }: RegisterInput
  ): Promise<Boolean> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const userData = {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        confirmed: false,
        isActive: true
      };
      const user = await User.create(userData).save();
      const url = await createConfirmationUrl(user.id);

      await sendEmail(email, url);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
