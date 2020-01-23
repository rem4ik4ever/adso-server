import { User } from "../entity/User";
import { sendConfirmationEmail } from "./emails.service";
import bcrypt from "bcryptjs";
import { logger } from "../utils/logger";
import { findUserByConfirmationToken } from "./users.service";

export interface RegisterInforation {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  confirmed: boolean;
}

/**
 * Register new user
 *
 * @param data RegistrationInformation
 */
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

/**
 * Confirm user and remove token from redis
 *
 * @param token Confiramtion token
 */
export const confirmUser = async (token: string): Promise<boolean> => {
  const userId = await findUserByConfirmationToken(token);
  if (!userId) return false;

  const user = await User.findOne(+userId);
  if (!user) return false;

  if (!user.confirmed) {
    user.confirmed = true;
    await user.save();
  }

  return true;
};
