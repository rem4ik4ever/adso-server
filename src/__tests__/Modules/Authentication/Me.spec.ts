import faker from "faker";
import { testConn } from "../../../test-utils/testConn";
import { createAccessToken } from "../../../modules/utils/auth";
import { User } from "../../../entity/User";
import { randomUser } from "../../helpers/UserHelpers";

beforeAll(async () => {
  await testConn();
})

describe('MeResolver', () => {
  it('should return user from accessToken', async () => {
    const user = await randomUser()
    const accessToken = createAccessToken(user)
    
  })
});