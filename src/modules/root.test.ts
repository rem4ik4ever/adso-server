import { gCall } from "../test-utils/gCall";
import { Connection } from "typeorm";
import { testConn } from "../test-utils/testConn";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
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
