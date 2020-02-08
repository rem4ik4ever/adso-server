import { testConn } from "../../../test-utils/testConn";
import { randomUser } from "../../../helpers/UserHelpers";
import { createConfirmationToken } from "../../../modules/utils/createConfirmationUrl";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";

beforeAll(async () => {
  await testConn();
});

const ConfirmUserMutation = `
  mutation ConfirmUserMutation($token: String!){
    confirm(token: $token)
  }
`;

describe("ConfirmUser", () => {
  it("should confirm user with valid confirmation token", async () => {
    const user = await randomUser({ confirmed: false });
    const confirmationToken = await createConfirmationToken(user.id);

    const response = await gCall({
      source: ConfirmUserMutation,
      variableValues: {
        token: confirmationToken
      }
    });
    expect(response).toMatchObject({
      data: {
        confirm: true
      }
    });
    const updatedUser = await User.findOne(user.id);
    expect(updatedUser?.confirmed).toBeTruthy();
  });

  it("should return false due to invalid confirmation token", async () => {
    const response = await gCall({
      source: ConfirmUserMutation,
      variableValues: {
        token: "some-bad-token"
      }
    });
    expect(response.errors).toBeDefined();
  });

  it("should return false because user is not found", async () => {
    const user = await randomUser({ confirmed: false });
    const confirmationToken = await createConfirmationToken(user.id);

    await User.delete(user.id);
    const response = await gCall({
      source: ConfirmUserMutation,
      variableValues: {
        token: confirmationToken
      }
    });
    expect(response.errors).toBeDefined();
  });
});
