import { User } from "../entity/User";
import { sendConfirmationEmail } from "./emails.service";
import bcrypt from "bcryptjs";
import { logger } from "../utils/logger";
import { findUserByConfirmationToken } from "./users.service";
import { verifyRefreshToken, createAccessToken } from "../modules/utils/auth";

export interface RegisterInforation {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  confirmed: boolean;
}

export interface ResponsePayload {
  data: any;
  error: string | null;
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
  const valid = await bcrypt.compare(password, user.password);
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
export const confirmUser = async (token: string): Promise<ResponsePayload> => {
  const userId = await findUserByConfirmationToken(token);
  if (!userId) return { data: false, error: "ConfirmationTokenExpired" };

  const user = await User.findOne(+userId);
  if (!user) return { data: false, error: "UserNotFound" };

  if (!user.confirmed) {
    user.confirmed = true;
    await user.save();
  }

  return {
    data: true,
    error: null
  };
};

/**
 * Resend confirmation email if existing confirmation expired
 *
 * @param email string
 * @param password string
 * @param token string
 */
export const resendConfirmation = async (
  email: string,
  password: string,
  token: string
): Promise<boolean> => {
  const userId = await findUserByConfirmationToken(token);
  if (userId) return false;

  const user = await loginUser(email, password);
  if (!user) return false;
  if (user.confirmed) return true;

  await sendConfirmationEmail(user.email, user.id);

  return true;
};

/**
 * Validate Refresh token and return new AccessToken
 *
 * @param refreshToken string
 */
export const refresh = async (refreshToken: string): Promise<string | null> => {
  let payload = null;
  try {
    payload = verifyRefreshToken(refreshToken);
    if (!payload || !payload.id) return null;
  } catch (error) {
    logger(error);
    return null;
  }
  const user = await User.findOne(payload.id);
  if (!user) return null;

  return createAccessToken(user);
};
