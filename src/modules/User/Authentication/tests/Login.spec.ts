import { testConn } from "../../../../test-utils/testConn";
import faker from "faker";
import { gCall } from "../../../../test-utils/gCall";
import { registerUser } from "../../../../services/authentication.service";

beforeAll(async () => {
  await testConn();
});

const LoginMutation = `
  mutation Login($input: LoginInput!){
    login(input: $input){
      firstName
      lastName
      email
    }
  }
`;

describe("Login", () => {
  it("should login user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "qwerty",
      isActive: true,
      confirmed: true
    };
    await registerUser(user);
    const response = await gCall({
      source: LoginMutation,
      variableValues: {
        input: {
          email: user.email,
          password: user.password
        }
      }
    });
    expect(response).toMatchObject({
      data: {
        login: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  });
});
