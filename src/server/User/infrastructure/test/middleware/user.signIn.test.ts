import { it, expect, describe, beforeEach } from "vitest";
import { middlewareSignIn } from "../../middleware/user.middlewate.signIn";
import { prisma } from "../../../../global/config/prismaClient";
import { PrismaUserRepository } from "../../repository/prisma.user";

beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("middleware SignIn ", () => {
  it("The middlewareSignUp middleware function should be a function", () => {
    expect(middlewareSignIn instanceof Function).toBe(true);
  });
  it("The middleware must validate the password format", () => {
    const clientOutPassword = {
      email: "ezequiel",
      password: "2",
    };
    expect(middlewareSignIn(clientOutPassword)).toStrictEqual({
      status: false,
      content: "the email or the password are incorrect",
    });
  });
  it("The middleware must validate the name format", () => {
    const clientOutPassword = {
      email: "",
      password: "PasswordCorrect10",
    };
    expect(middlewareSignIn(clientOutPassword)).toStrictEqual({
      status: false,
      content: "the email or the password are incorrect",
    });
  });
  it("The middleware should let it continue execution", () => {
    const clientOutPassword = {
      email: "ezequiel@gmail.com",
      password: "PasswordCorrect10",
    };
    expect(middlewareSignIn(clientOutPassword)).toStrictEqual({
      status: true,
      content: "all ok",
    });
  });
});
