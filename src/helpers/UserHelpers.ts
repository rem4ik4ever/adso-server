import faker from "faker";
import { User } from "../entity/User";

export const randomUser = async (props?: any) => {
  const data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isActive: true,
    confirmed: true
  };
  return await User.create({ ...data, ...props }).save();
};
