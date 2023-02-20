import { it, expect, describe, beforeEach } from "vitest";
import { middlewareProfile } from "../../middleware/user.middleware.profile";
import { prisma } from "../../../../global/config/prismaClient";
import { PrismaUserRepository } from "../../repository/prisma.user";
import { NextApiRequest } from "next";
import { tokenGenerator } from "../../auth/user.tokenGenerator";
beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("middleware Profile", () => {
  it("The middlewareSignUp function should be a function", () => {
    expect(middlewareProfile instanceof Function).toBe(true);
  });
  it(`should throw an exception if no header is provided`, () => {
    const requestTest: any = {
      headers: {
        test: "test1",
      },
    };

    expect(middlewareProfile(requestTest)).toStrictEqual({
      status: false,
      content: "data not found",
    });
  });

  it(`should throw an exception if the data is not required`, async () => {
    const requestTest: any = {
      headers: {
        setcookies: ["test1"],
      },
    };
    expect(middlewareProfile(requestTest)).toStrictEqual({
      status: false,
      content: "incorrect parameters",
    });
  });
  it(`should throw an exception if the data is not required`, async () => {
    const requestTest: any = {
      headers: {
        setcookies: ["test1"],
      },
    };
    expect(middlewareProfile(requestTest)).toStrictEqual({
      status: false,
      content: "incorrect parameters",
    });
  });
  it(`should throw an exception if given an invalid cookies`, async () => {
    const requestTest: any = {
      headers: {
        setcookies: "sdadsadsaa adasdada asd ad asda sdada sdas dadadasda",
      },
    };
    expect(middlewareProfile(requestTest)).toStrictEqual({
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
      headers: {
        setcookies: cokkies.content,
      },
    };
    const dataOfCookies = middlewareProfile(requestTest);

    if (typeof dataOfCookies.content === "string")
      return expect(true).toBe(false);

    expect(dataOfCookies.content.id).toBe(id);
  });
});
