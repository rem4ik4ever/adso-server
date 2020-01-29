import faker from "faker";
import { testConn } from "../../../test-utils/testConn";
import { registerUser } from "../../../services/authentication.service";
import { gCall } from "../../../test-utils/gCall";
import { randomUser } from "../../../helpers/UserHelpers";

beforeAll(async () => {
  await testConn();
});

const LoginMutation = `
  mutation Login($input: LoginInput!){
    login(input: $input){
      accessToken
      refreshToken
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

    expect(response?.data?.login?.accessToken).toBeDefined();
    expect(response?.data?.login?.refreshToken).toBeDefined();
  });

  it("should not login", async () => {
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
          password: "somepass"
        }
      }
    });

    expect(response?.data).toBeNull();
  });

  it("should not login not confirmed user", async () => {
    const user = await randomUser({ confirmed: false });
    const response = await gCall({
      source: LoginMutation,
      variableValues: {
        input: {
          email: user.email,
          password: "qwerty"
        }
      }
    });
    expect(response.errors).toBeDefined();
    const error = response.errors![0];
    expect(error.message).toEqual("user_not_confirmed");
  });
});
