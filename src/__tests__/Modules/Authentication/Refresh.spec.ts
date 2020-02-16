import { testConn } from "../../../test-utils/testConn";
import { randomUser } from "../../../helpers/UserHelpers";
import { gCall } from "../../../test-utils/gCall";
import {
  createRefreshToken,
  verifyAccessToken
} from "../../../modules/utils/auth";
import { User } from "../../../entity/User";

beforeAll(async () => {
  await testConn();
});

const RefreshQuery = `
  mutation Refresh {
    refresh
  }
`;

describe("Refresh", () => {
  it("should validate refreshToken and return valid accessToken", async () => {
    const user = await randomUser();
    const refreshToken = await createRefreshToken(user);
    const response = await gCall({
      source: RefreshQuery,
      variableValues: {},
      cookies: {
        adso_qid: refreshToken
      }
    });
    expect(response).toBeDefined();
    const accessToken = response.data?.refresh;
    const payload = verifyAccessToken(accessToken);
    expect(payload.id).toEqual(user.id);
  });

  it("should return null due to invalid refreshToken", async () => {
    const response = await gCall({
      source: RefreshQuery,
      variableValues: {},
      cookies: {
        adso_qid: "bad-bad-token"
      }
    });
    expect(response).toMatchObject({
      data: {
        refresh: null
      }
    });
  });

  it("should return null due missing user", async () => {
    const user = await randomUser();
    const refreshToken = await createRefreshToken(user);

    await User.delete(user.id);
    const response = await gCall({
      source: RefreshQuery,
      variableValues: {},
      cookies: {
        adso_qid: refreshToken
      }
    });

    expect(response).toMatchObject({
      data: {
        refresh: null
      }
    });
  });

  it("should return null due to missing refreshToken cookie", async () => {
    const response = await gCall({
      source: RefreshQuery,
      variableValues: {},
      cookies: {}
    });

    expect(response).toMatchObject({
      data: {
        refresh: null
      }
    });
  });

  it("should return null due to missing cookies in request", async () => {
    const response = await gCall({
      source: RefreshQuery,
      variableValues: {}
    });

    expect(response).toMatchObject({
      data: {
        refresh: null
      }
    });
  });
});
