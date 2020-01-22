import { testConn } from "../../../../test-utils/testConn";
import faker from "faker";
import { User } from "../../../../entity/User";
import { gCall } from "../../../../test-utils/gCall";

beforeAll(async () => {
  await testConn();
});

const RegisterMutation = `
  mutation Register($input: RegisterInput!){
    register(input: $input)
  }
`;

describe("Register", () => {
  it("should register user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    await gCall({
      source: RegisterMutation,
      variableValues: {
        input: user
      }
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toEqual(user.firstName);
  });
});