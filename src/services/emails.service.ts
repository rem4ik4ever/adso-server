import { createConfirmationUrl } from "../modules/utils/createConfirmationUrl";
import { sendEmail } from "../modules/utils/sendEmail";

/**
 * Send confirmation email
 *
 * @param email User email
 * @param userId User ID
 */
export const sendConfirmationEmail = async (email: string, userId: number) => {
  if (process.env.NODE_ENV === "test") return;

  const url = await createConfirmationUrl(userId);
  return sendEmail(email, url);
};
