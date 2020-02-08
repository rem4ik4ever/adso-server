import { createConfirmationToken } from "../modules/utils/createConfirmationUrl";
import { sendEmail } from "../modules/utils/sendEmail";

/**
 * Send confirmation email
 *
 * @param email User email
 * @param userId User ID
 */
export const sendConfirmationEmail = async (
  email: string,
  userId: number
): Promise<string> => {
  const token = await createConfirmationToken(userId);
  if (process.env.NODE_ENV === "test") return token;

  sendEmail(email, `http://localhost:3000/confirm?token=${token}`);
  return token;
};
