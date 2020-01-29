import faker from "faker";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

export const randomUser = async (props?: any) => {
  const data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: await bcrypt.hash("qwerty", 12),
    isActive: true,
    confirmed: true
  };
  return await User.create({ ...data, ...props }).save();
};
