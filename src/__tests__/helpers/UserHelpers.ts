import faker from 'faker'
import { User } from '../../entity/User'

interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  confirmed: boolean;
}

export const randomUser = async (props?: UserInterface) => {
  const data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isActive: true,
    confirmed: true
  }
  return await User.create({...data, ...props})
}