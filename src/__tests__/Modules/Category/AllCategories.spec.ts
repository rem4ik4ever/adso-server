import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import { randomCategory } from "../../../helpers/CategoryHelpers";
import { Category } from "../../../entity/Category";

beforeAll(async () => {
  await testConn();
});

beforeEach(async () => {
  await Category.clear();
});

const ALL_CATEGORIES = `
  query allCategotires {
    allCategories {
      name
    }
  }
`;

describe("AllCategories", () => {
  it("should return list of available categories", async () => {
    await randomCategory({ name: "category-1" });

    const response = await gCall({
      source: ALL_CATEGORIES
    });
    expect(response).toBeDefined();
    expect(response).toMatchObject({
      data: {
        allCategories: [{ name: "category-1" }]
      }
    });
  });
  it("should return two of available categories", async () => {
    await randomCategory({ name: "category-1" });
    await randomCategory({ name: "category-2" });

    const response = await gCall({
      source: ALL_CATEGORIES
    });
    expect(response).toBeDefined();
    expect(response).toMatchObject({
      data: {
        allCategories: [{ name: "category-1" }, { name: "category-2" }]
      }
    });
  });
});
