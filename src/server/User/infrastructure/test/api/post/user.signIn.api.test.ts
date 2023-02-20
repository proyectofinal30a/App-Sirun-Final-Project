import { describe, expect, it, beforeEach } from "vitest";
import { EntityProfileClient } from "../../../../domain/entity.user";

import axios, { AxiosResponse } from "axios";

import { PrismaUserRepository } from "../../../repository/prisma.user";
import { prisma } from "@/server/global/config/prismaClient";

interface AxiosResponseClient {
  status: boolean;
  content: EntityProfileClient;
}

beforeEach(async () => {
  await prisma.client.deleteMany();
});

describe("SignIp Api End Point", () => {
  it("the signIn up endpoint should work", async () => {
    try {
      await axios.post("http://localhost:3000/api/user/post/signIn");
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
  it("It should show an exception when placing an incorrect password or email", async () => {
    try {
      const client = {
        name: "ezequiel",
        email: "ezequiel@gmial.com",
        password: "12312312312Asd",
        photo: "ezequiel.jp",
      };

      const clientOfPrisma = await new PrismaUserRepository().signUp(client);

      if (clientOfPrisma.content === null) {
        return expect(true).toBe(false);
      }

      const { email } = client;

      const paramsAxios = {
        url: "http://localhost:3000/api/user/post/signIn",
        method: "POST",
        data: { email, password: "test1" },
      };
      await axios(paramsAxios);
    } catch (error: any) {
      expect(error.response.data.content).toBe(
        "the email or the password are incorrect"
      );
    }
  });
  it("It should show an exception when placing an incorrect password or email", async () => {
    try {
      const paramsAxios = {
        url: "http://localhost:3000/api/user/post/signIn",
        method: "POST",
        data: { email: "test2", password: "test1" },
      };
      await axios(paramsAxios);
    } catch (error: any) {
      expect(error.response.data.content).toBe(
        "the email or the password are incorrect"
      );
    }
  });
  it("It should show an exception when placing an incorrect password or email", async () => {
    try {
      const client = {
        name: "ezequiel",
        email: "ezequiel@gmial.com",
        password: "12312312312Asd",
        photo: "ezequiel.jp",
      };

      const clientOfPrisma = await new PrismaUserRepository().signUp(client);

      if (clientOfPrisma.content === null) {
        return expect(true).toBe(false);
      }

      const { email } = client;

      const paramsAxios = {
        url: "http://localhost:3000/api/user/post/signIn",
        method: "POST",
        data: { email, password: "test1" },
      };
      await axios(paramsAxios);
    } catch (error: any) {
      expect(error.response.data.content).toBe(
        "the email or the password are incorrect"
      );
    }
  });
  it("Should be able to log in", async () => {
    try {
      const client = {
        name: "ezequiel",
        email: "ezequiel@gmial.com",
        password: "12312312312Asd",
        photo: "ezequiel.jp",
      };

      const clientOfPrisma = await new PrismaUserRepository().signUp(client);

      if (clientOfPrisma.content === null) {
        return expect(true).toBe(false);
      }

      const { email, password } = client;

      const paramsAxios = {
        url: "http://localhost:3000/api/user/post/signIn",
        method: "POST",
        data: { email, password },
      };
      const clientApi: AxiosResponse<AxiosResponseClient> = await axios(
        paramsAxios
      );

      expect(clientApi.data.status).toBe(true);
    } catch (error: any) {
      expect(error.response.data.content).toBe(
        "the email or the password are incorrect"
      );
    }
  });
});
