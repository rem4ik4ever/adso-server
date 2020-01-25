import { testConn } from "../../../test-utils/testConn";
import { createAccessToken } from "../../../modules/utils/auth";
import { randomUser } from "../../../helpers/UserHelpers";
import { gCall } from "../../../test-utils/gCall";

beforeAll(async () => {
  await testConn();
});

const MeQuery = `
  {
    me {
      firstName
      lastName
    }
  }
`;

describe("MeResolver", () => {
  it("should return user from accessToken", async () => {
    const user = await randomUser({ firstName: "Rem", lastName: "Kim" });
    const accessToken = createAccessToken(user);

    const response = await gCall({
      source: MeQuery,
      variableValues: {},
      accessToken
    });

    expect(response).toMatchObject({
      data: {
        me: {
          firstName: "Rem",
          lastName: "Kim"
        }
      }
    });
  });

  it("should not return user from accessToken", async () => {
    const user = await randomUser({ firstName: "Rem", lastName: "Kim" });
    const accessToken = createAccessToken(user);

    const response = await gCall({
      source: MeQuery,
      variableValues: {},
      accessToken: `${accessToken}.jibberish`
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });

  it("should not return user when no Authorization header is provided", async () => {
    await randomUser({ firstName: "Rem", lastName: "Kim" });

    const response = await gCall({
      source: MeQuery,
      variableValues: {}
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });

  it("should not return user when Authorization header token is empty", async () => {
    await randomUser({ firstName: "Rem", lastName: "Kim" });

    const response = await gCall({
      source: MeQuery,
      variableValues: {},
      customHeaders: {
        authorization: "jibberish"
      }
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });
});
