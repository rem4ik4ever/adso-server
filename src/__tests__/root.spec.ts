import { testConn } from "../test-utils/testConn";
import { gCall } from "../test-utils/gCall";

beforeAll(async () => {
  await testConn();
});

const hello = `
  {
    hello
  }
`;

describe("root", () => {
  it("should return Hello World", async () => {
    const response = await gCall({ source: hello });
    expect(response).toMatchObject({
      data: {
        hello: "Hello World"
      }
    });
  });
});
