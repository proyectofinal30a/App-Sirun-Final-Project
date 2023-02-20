import { it, expect, describe, beforeEach } from "vitest";
import { middlewareUpdate } from "../../middleware/user.middleware.update";
import { prisma } from "../../../../global/config/prismaClient";
import { PrismaUserRepository } from "../../repository/prisma.user";
import { tokenGenerator } from "../../auth/user.tokenGenerator";
beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("middleware Update", () => {
  it("The middlewareSignUp middleware function should be a function", () => {
    expect(middlewareUpdate instanceof Function).toBe(true);
  });
  it(`should be able to verify the data`, () => {
    const clientOutPassword: any = {
      body: {
        name: "",
        password: "12",
        photo: "as",
      },
      headers: {
        setcookies: "test1",
      },
    };
    expect(middlewareUpdate(clientOutPassword)).toStrictEqual({
      status: false,
      content: "data not found",
    });
  });
  it(`should throw an exception if given an invalid cookies`, async () => {
    const requestTest: any = {
      body: {
        name: "Ezequiel",
        password: "Ezs10AAAaas",
        photo: "asdasda.png",
      },
      headers: {
        setcookies: "sdadsadsaa adasdada asd ad asda sdada sdas dadadasda",
      },
    };
    expect(middlewareUpdate(requestTest)).toStrictEqual({
      status: false,
      content: "invalid cookies",
    });
  });
  it(`if the parameters are correct it should return the data`, async () => {
    type parametertokenType = {
      id: string;
      role: "CLIENT";
    };

    const { id, role }: parametertokenType = { id: "test1", role: "CLIENT" };

    const cokkies = tokenGenerator({ id, role });

    const requestTest: any = {
      body: {
        name: "Ezequiel",
        password: "Ezs10AAAaas",
        photo: "asdasda.png",
      },
      headers: {
        setcookies: cokkies.content,
      },
    };
    const dataOfCookies = middlewareUpdate(requestTest);

    if (typeof dataOfCookies.content === "string")
      return expect(true).toBe(false);

    expect(dataOfCookies.content.id).toBe(id);
  });
});
