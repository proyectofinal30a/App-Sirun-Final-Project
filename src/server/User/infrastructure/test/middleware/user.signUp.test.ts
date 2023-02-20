import { it, expect, describe, beforeEach } from "vitest";
import { middlewareSignUp } from "../../middleware/user.middleware.signUp";
import {prisma }from "../../../../global/config/prismaClient";
import { PrismaUserRepository } from "../../repository/prisma.user";

beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("middleware Sign Up", () => {
  it("The middlewareSignUp function should be a function", () => {
    expect(middlewareSignUp instanceof Function).toBe(true);
  });
  it(`should send a false if the Client information is wrong`, async () => {
    const newClient = {
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
      password: "ezequielE10",
    };
    expect(await middlewareSignUp(newClient)).toStrictEqual({
      status: false,
      content: "Customer data is missing",
    });
  });

  it(`Should throw an exception if the email is already in the database`, async () => {
    const methodsClient = new PrismaUserRepository();
    const repeatClient = {
      name: "ezequiel",
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
      password: "ezequielE10",
    };
    await methodsClient.signUp(repeatClient);

    expect(await middlewareSignUp(repeatClient)).toStrictEqual({
      status: false,
      content: `the user is already logged in`,
    });
  });
  it(`If all the data is correct, the execution should continue`, async () => {
    const correctCustomer = {
      name: "ezequiel",
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
      password: "ezequielE10",
    };

    expect(await middlewareSignUp(correctCustomer)).toStrictEqual({
      status: true,
      content: `all ok`,
    });
  });
});
