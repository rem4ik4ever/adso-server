import {User} from '../entity/User'

export interface RegisterInforation{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isActive: boolean,
  confirmed: boolean
}

export const registerUser = async (data: RegisterInforation):Promise<Boolean> => {
  try {
    await User.create(data).save()
  } catch (err) {
    return false;
  }
  return true
  
}