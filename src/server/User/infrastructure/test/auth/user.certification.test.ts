import { describe, expect, it, beforeEach } from "vitest";
import { EntitySignUpClient } from "../../../domain/entity.user";
import { prisma } from "@/server/global/config/prismaClient";
import { tokenGenerator } from "../../auth/user.tokenGenerator";
import bcr from "bcryptjs";
import jwt from "jsonwebtoken";
import { certificationCLient } from "../../auth/user.certification";
import { PrismaUserRepository } from "../../repository/prisma.user";
beforeEach(async () => {
  await prisma.client.deleteMany();
});
describe("Client certification", () => {
  it("Certification function should exist", () => {
    expect(certificationCLient instanceof Function).toBe(true);
  });
  //   it("Should accept an object with a header property", () => {
  //     const headers: any = null;
  //     expect(certificationCLient({ headers })).toStrictEqual({
  //       status: false,
  //       content: "should have header",
  //     });
  //   });

  it("It should throw an exception when an invalid token is put on it.", async () => {
    expect(certificationCLient("string")).toStrictEqual({
      status: false,
      content: "Invalid Token",
    });
  });
  it("should be able to accept valid tokens", async () => {
    const client = {
      name: "ezequiel",
      email: "ezequiel@gmail.com",
      password: "1234556Ab",
      photo: "ezequiel.png",
    };
    const clientPrisma = await new PrismaUserRepository().signUp(client);

    if (clientPrisma.content === null) return expect(true).toBe(false);

    const { id, role } = clientPrisma.content;

    const cokkies = tokenGenerator({ id, role });

    expect(certificationCLient(cokkies.content).status).toBe(true);
  });
});
