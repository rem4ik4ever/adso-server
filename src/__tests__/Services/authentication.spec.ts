import faker from "faker";
import { testConn } from "../../test-utils/testConn";
import {
  registerUser,
  loginUser,
  confirmUser,
  resendConfirmation,
  refresh
} from "../../services/authentication.service";
import { User } from "../../entity/User";
import { createConfirmationToken } from "../../modules/utils/createConfirmationUrl";
import { randomUser } from "../../helpers/UserHelpers";
import {
  createRefreshToken,
  verifyAccessToken
} from "../../modules/utils/auth";

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

  describe("#confirmUser", () => {
    it("should set confirmed field to true", async () => {
      const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "qwerty",
        isActive: true,
        confirmed: false
      };
      const user = await User.create(userData).save();
      const confirmationToken = await createConfirmationToken(user.id);

      await confirmUser(confirmationToken);
      const confirmedUser = await User.findOne(user.id);

      expect(user.confirmed).toBeFalsy();
      expect(confirmedUser).toBeDefined();
      expect(confirmedUser?.confirmed).toBeTruthy();
    });

    it("should not confirm user and return becuase token expired", async () => {
      const { data, error } = await confirmUser("some-invalid-token");

      expect(data).toBeFalsy();
      expect(error).toBeDefined();
      expect(error).toEqual("ConfirmationTokenExpired");
    });

    it("should set confirmed field to true", async () => {
      const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "qwerty",
        isActive: true,
        confirmed: false
      };
      const user = await User.create(userData).save();
      const confirmationToken = await createConfirmationToken(user.id);
      await User.delete(user.id);

      const { data, error } = await confirmUser(confirmationToken);

      expect(data).toBeFalsy();
      expect(error).toBeDefined();
      expect(error).toEqual("UserNotFound");
    });
  });

  describe("#resendConfirmation", () => {
    it("should resend confirmation email if confrimation token expired", async () => {
      const user = await randomUser({ confirmed: false });

      const result = await resendConfirmation(
        user.email,
        "qwerty",
        "some-bad-token"
      );

      expect(result).toBeTruthy();
    });

    it("should not resend confirmation email if confrimation token is not expired", async () => {
      const user = await randomUser({ confirmed: false });
      const token = await createConfirmationToken(user.id);

      const result = await resendConfirmation(user.email, "qwerty", token);

      expect(result).toBeFalsy();
    });

    it("should not resend confirmation email if user credentials are invalid", async () => {
      const user = await randomUser({ confirmed: false });

      const result = await resendConfirmation(
        user.email,
        "qwertywrong",
        "some-bad-token"
      );

      expect(result).toBeFalsy();
    });

    it("should not resend confirmation email if user is already confirmed", async () => {
      const user = await randomUser({ confirmed: true });

      const result = await resendConfirmation(
        user.email,
        "qwerty",
        "some-bad-token"
      );

      expect(result).toBeTruthy();
    });
  });

  describe("#refresh", () => {
    it("should generate new accessToken using refreshToken", async () => {
      const user = await randomUser();
      const token = createRefreshToken(user);

      const accessToken = await refresh(token);
      const payload = verifyAccessToken(accessToken!);

      expect(accessToken).toBeDefined();
      expect(payload?.id).toEqual(user.id);
    });

    it("should not generate accessToken becuase refreshToken is invalid", async () => {
      const accessToken = await refresh("some-bad-token");
      expect(accessToken).toBeNull();
    });

    it("should not generate new accessToken because refreshToken user does not exist", async () => {
      const user = await randomUser();
      const refreshToken = createRefreshToken(user);

      await User.delete(user.id);
      const accessToken = await refresh(refreshToken);
      expect(accessToken).toBeNull();
    });
  });
});
