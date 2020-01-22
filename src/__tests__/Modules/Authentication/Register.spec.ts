import faker from "faker";
import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

beforeAll(async () => {
  await testConn();
});

const RegisterMutation = `
  mutation Register($input: RegisterInput!){
    register(input: $input){
      firstName
      lastName
      email
    }
  }
`;

describe("Register", () => {
  it("should register user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "qwerty"
    };
    const response = await gCall({
      source: RegisterMutation,
      variableValues: {
        input: user
      }
    });
    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toEqual(user.firstName);
  });
});
