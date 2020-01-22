import { User } from "../entity/User";
import { sendConfirmationEmail } from "./emails.service";
import bcrypt from "bcryptjs";
import { logger } from "../utils/logger";

export interface RegisterInforation {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  confirmed: boolean;
}

export const registerUser = async (
  data: RegisterInforation
): Promise<User | null> => {
  let user = null;
  try {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    user = await User.create({ ...data, password: hashedPassword }).save();
    sendConfirmationEmail(user.email, user.id);
  } catch (err) {
    return user;
  }
  return user;
};

/**
 * Login user
 *
 * @param email string
 * @param password string
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await User.findOne({
    where: { email }
  });
  if (!user) {
    logger("user_not_found");
    return null;
  }
  const valid = await bcrypt.compare(password, user?.password);
  if (valid) {
    return user;
  }

  return null;
};
