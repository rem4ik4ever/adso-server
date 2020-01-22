import { registerUser, loginUser } from "../authentication.service";
import faker from "faker";
import { User } from "../../entity/User";
import { testConn } from "../../test-utils/testConn";

beforeAll(async () => {
  await testConn();
});

describe("authentication.service", () => {
  describe("#register", () => {
    it("should create new user", async () => {
      const data = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "qwerty",
        isActive: true,
        confirmed: false
      };
      await registerUser(data);
      const user = await User.findOne({ where: { email: data.email } });
      expect(user).toBeDefined();
      expect(user!.email).toEqual(data.email);
      expect(user!.firstName).toEqual(data.firstName);
      expect(user!.lastName).toEqual(data.lastName);
    });

    it("should not register user with email that exists in DB", async () => {
      const data = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: "bob@bob.com",
        password: "qwerty",
        isActive: true,
        confirmed: false
      };

      await User.create(data).save();

      const user = await registerUser(data);
      expect(user).toBeNull();
    });
  });

  describe("#login", () => {
    it("should login with email and password", async () => {
      const data = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "qwerty",
        isActive: true,
        confirmed: false
      };
      await registerUser(data);

      const user = await loginUser(data.email, data.password);
      expect(user).toBeDefined();
      expect(user!.email).toEqual(data.email);
    });

    it("should not login because of invalid password", async () => {
      const data = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "qwerty",
        isActive: true,
        confirmed: false
      };
      await registerUser(data);

      const user = await loginUser(data.email, "invalidpass");

      expect(user).toBeNull();
    });

    it("should throw user not found exception", async () => {
      const user = await loginUser("nonexisting@email.com", "anypass");
      expect(user).toBeNull();
    });
  });
});
