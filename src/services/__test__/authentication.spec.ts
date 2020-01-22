import { registerUser } from "../authentication.service"
import faker from 'faker'
import { User } from "../../entity/User"
import { testConn } from "../../test-utils/testConn";

beforeAll(async () => {
  await testConn();
});

describe('authentication.service', () => {
  describe('#register', () => {
    it('should create new user', async () => {
      const data = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'qwerty',
        isActive: true,
        confirmed: false
      }
      await registerUser(data)
      const user = await User.findOne({where: {email: data.email}})
      expect(user).toBeDefined()
      expect(user!.email).toEqual(data.email)
      expect(user!.firstName).toEqual(data.firstName)
      expect(user!.lastName).toEqual(data.lastName)
      // expect(user!.password).not.toEqual(data.password)
    })
  })
})