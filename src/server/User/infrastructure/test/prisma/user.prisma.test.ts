import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "../../../../global/config/prismaClient";
import { PrismaUserRepository } from "../../repository/prisma.user";

describe("Prisma Client methods", () => {
  beforeEach(async () => {
    await prisma.client.deleteMany();
  });
  const methodsClientPrisma = new PrismaUserRepository();
  const client = {
    name: "Ezequiel",
    email: "Ezequiel12@gmail.com",
    photo: "ezequiel.jpg",
    password: "ezequielE10",
  };
  const clientOutPassword = {
    name: "Ezequiel",
    email: "Ezequiel12@gmail.com",
    photo: "ezequiel.jpg",
  };
  it("prisma must have the client method.", () => {
    expect(Boolean(prisma.client)).toBe(true);
  });
  it("the method signUp should create a client.", async () => {
    const newClient = await methodsClientPrisma.signUp(client);

    if (newClient.content === null) {
      return expect(true).toBe(false);
    }
    expect(newClient.content.email).toBe(client.email);
  });
  it("The method should singUP fail if an incorrect client parameter is passed to it.", async () => {
    const clientFail = {
      name: "",
      email: "",
      photo: "",
      password: "123",
    };
    expect(await methodsClientPrisma.signUp(clientFail)).toStrictEqual({
      content: null,
      status: false,
    });
  });
  it("The signIn method should show me the customer information.", async () => {
    const clients = await prisma.client.findFirst();
    clients &&
      expect(await methodsClientPrisma.signIn(clients.id)).toStrictEqual({
        content: clientOutPassword,
        status: true,
      });
  });
  it("The signIn method should fail if an id is not passed to it.", async () => {
    expect(await methodsClientPrisma.signIn("")).toStrictEqual({
      content: null,
      status: false,
    });
  });
  it("The updateClient method should return the updated user.", async () => {
    const clientOne = await prisma.client.findFirst();

    if (!clientOne) return;

    const clientUpdate = {
      id: clientOne.id,
      name: "Ignacio",
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
      password: "ignacio10",
    };
    const clientUpdateOutPasswrod = {
      name: "Ignacio",
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
    };
    expect(await methodsClientPrisma.updateClient(clientUpdate)).toStrictEqual({
      content: clientUpdateOutPasswrod,
      status: true,
    });
  });
  it("The updateClient method should return an error if it is not passed the correct parameters.", async () => {
    const clientUpdate = {
      id: "test-id",
      name: "Ignacio",
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
      password: "ignacio10",
    };

    expect(await methodsClientPrisma.updateClient(clientUpdate)).toStrictEqual({
      content: null,
      status: false,
    });
  });
  it("The activeClient method should actived the client.", async () => {
    const clientForActive = {
      name: "Ezequiel",
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
      password: "ezequielE10",
    };
    await methodsClientPrisma.signUp(clientForActive);
    const clientOne = await prisma.client.findFirst({
      where: { email: "Ezequiel12@gmail.com" },
    });
    if (!clientOne) return;

    expect(
      await methodsClientPrisma.activeClient(clientOne.email)
    ).toStrictEqual({
      status: true,
      content: `the user with the id ${clientOne.id} has been activated`,
    });
  });
  it("The activeClient method should return an exception for not having a valid id.", async () => {
    expect(await methodsClientPrisma.activeClient("")).toStrictEqual({
      status: false,
      content: null,
    });
  });
  it("The disableClient method should disable the client.", async () => {
    const clientForActive = {
      name: "Ezequiel",
      email: "Ezequiel12@gmail.com",
      photo: "ezequiel.jpg",
      password: "ezequielE10",
    };
    await methodsClientPrisma.signUp(clientForActive);
    const clientOne = await prisma.client.findFirst({
      where: { email: "Ezequiel12@gmail.com" },
    });

    if (!clientOne) return;

    expect(await methodsClientPrisma.disableClient(clientOne.id)).toStrictEqual(
      {
        status: true,
        content: `the user with the id ${clientOne.id} has been deactivated`,
      }
    );
  });
  it("The disableClient method should return an exception for not having a valid id.", async () => {
    expect(await methodsClientPrisma.disableClient("")).toStrictEqual({
      status: false,
      content: null,
    });
  });
});
