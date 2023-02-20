import { describe, expect, it, beforeEach } from "vitest";
import { EntitySignUpClient } from "../../../domain/entity.user";
import { prisma } from "@/server/global/config/prismaClient";
import { authCLient } from "../../auth/user.auth";
import { PrismaUserRepository } from "../../repository/prisma.user";
beforeEach(async () => {
  await prisma.client.deleteMany();
});
describe("Client authentication", () => {
  it("Authentication function should exist", () => {
    expect(authCLient instanceof Function).toBe(true);
  });
  it(`Must verify passwords`, async () => {
    const client: EntitySignUpClient = {
      name: "ezequiel",
      email: "ezequiel@gmial",
      password: "Ezequiel123",
      photo: "eze.png",
    };
    const clientOfPrisma = await new PrismaUserRepository().signUp(client);

    if (clientOfPrisma.content === null) return expect(true).toBe(false);
    
    const { password: authClient } = client;
    const { password: authServer } = clientOfPrisma.content;

    const isAuth = await authCLient({ authClient, authServer });
    expect(isAuth.status).toBe(true);
  });
  it("It should show an exception when placing incorrect parameters", async () => {
    const isAuth = await authCLient({
      authClient: "test1",
      authServer: "test2",
    });

    expect(isAuth.status).toBe(false);
  });
});
